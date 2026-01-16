/**********************
 * 1) FIREBASE SETUP
 **********************/
const firebaseConfig = {
 apiKey: "AIzaSyAeM3TIPVlrNUjRc7MG1Oh3P6QvauEdIiI",
  authDomain: "friedrich-ii-onlinegame.firebaseapp.com",
  databaseURL: "https://friedrich-ii-onlinegame-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "friedrich-ii-onlinegame",
  storageBucket: "friedrich-ii-onlinegame.firebasestorage.app",
  messagingSenderId: "427784840958",
  appId: "1:427784840958:web:72ab5241a25a36215ea7af",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const stateRef = db.ref("game/state");

/**********************
 * 2) GAME SETUP
 **********************/
let role = "";
let autoPlay = true;

// Nur diese SFX-Dateien nutzt du:
const SFX = {
  glocke: "sounds/glocke.mp3",
  floete: "sounds/floete.mp3",
  krieg:  "sounds/krieg.mp3",
  ruhig:  "sounds/ruhig.mp3",
};

// Dein Skript (wie bei dir, ohne Text bei SFX)
const scenes = [
  {
    title: "Szene 1 – Der Beginn",
    image: "images/klasse.jpg",
    lines: [
      { sfx: "glocke" },

      { speaker: "Lehrer", text: "So, Kinder. Heute reisen wir zurück ins 18. Jahrhundert." },
      { speaker: "Tim", text: "Herr Lehrer… ist WLAN vorhanden?" },
      { speaker: "Lehrer", text: "Nein, aber Philosophen." },
      { speaker: "Tim", text: "Dann wird’s hart." },
      { speaker: "Lea", text: "Wir sprechen über Friedrich II., oder?" },
      { speaker: "Lehrer", text: "Ganz genau! Auch genannt Friedrich der Große." },

      { sfx: "floete" },

      { speaker: "Tim", text: "Warum läuft hier Mittelalter-Spotify?" },
      { speaker: "Lehrer", text: "Friedrich spielte Flöte. Sehr gut sogar." }
    ]
  },
  {
    title: "Szene 2 – Der Militärkönig",
    image: "images/krieg.jpg",
    lines: [
      { sfx: "krieg" },

      { speaker: "Lea", text: "Aber er war auch dauernd im Krieg." },
      { speaker: "Lehrer", text: "Ja. Friedrich liebte Ordnung… und Kanonen." },
      { speaker: "Tim", text: "Warum?" },
      { speaker: "Lehrer", text: "Weil Preußen sonst untergegangen wäre." }
    ]
  },
  {
    title: "Szene 3 – Fazit",
    image: "images/fazit.jpg",
    lines: [
      { sfx: "ruhig" },

      { speaker: "Lehrer", text: "Friedrich II. war ein Herrscher voller Widersprüche." },
      { speaker: "Lea", text: "Reformer und Autokrat zugleich." },
      { speaker: "Tim", text: "Aber extrem wichtig für Preußen." }
    ]
  }
];

// 🔥 Sprecher-Audios automatisch nummerieren (tim1, tim2, ...)
function precomputeSpeakerAudio() {
  let t = 0, l = 0, le = 0;
  for (const scene of scenes) {
    for (const line of scene.lines) {
      if (line.sfx) {
        line.audio = SFX[line.sfx] || "";
        continue;
      }
      if (line.speaker === "Tim") line.audio = `sounds/tim${++t}.mp3`;
      else if (line.speaker === "Lea") line.audio = `sounds/lea${++l}.mp3`;
      else if (line.speaker === "Lehrer") line.audio = `sounds/lehrer${++le}.mp3`;
      else line.audio = "";
    }
  }
}
precomputeSpeakerAudio();

/**********************
 * 3) UI HELPERS
 **********************/
function $(id) { return document.getElementById(id); }
function isTeacher() { return role === "Lehrer"; }

function atEnd(state) {
  const s = scenes[state.sceneIndex];
  return state.sceneIndex === scenes.length - 1 &&
    state.lineIndex === s.lines.length - 1;
}

function nextState(state) {
  const s = scenes[state.sceneIndex];
  if (state.lineIndex < s.lines.length - 1) {
    return { sceneIndex: state.sceneIndex, lineIndex: state.lineIndex + 1 };
  }
  if (state.sceneIndex < scenes.length - 1) {
    return { sceneIndex: state.sceneIndex + 1, lineIndex: 0 };
  }
  return state; // bleibt am Ende
}

function prevState(state) {
  if (state.lineIndex > 0) {
    return { sceneIndex: state.sceneIndex, lineIndex: state.lineIndex - 1 };
  }
  if (state.sceneIndex > 0) {
    const prevScene = scenes[state.sceneIndex - 1];
    return { sceneIndex: state.sceneIndex - 1, lineIndex: prevScene.lines.length - 1 };
  }
  return state;
}

/**********************
 * 4) WOW-EFFEKT: TYPEWRITER
 **********************/
let typeTimer = null;
function typeText(el, text) {
  if (typeTimer) clearInterval(typeTimer);
  el.textContent = "";
  let i = 0;
  typeTimer = setInterval(() => {
    el.textContent += text[i] || "";
    i++;
    if (i >= text.length) clearInterval(typeTimer);
  }, 18);
}

/**********************
 * 5) AUDIO + AUTOPLAY
 **********************/
function playLineAudio(line, onEnd) {
  const audio = $("sceneAudio");
  audio.onended = null;
  audio.pause();
  audio.currentTime = 0;

  if (!line.audio) {
    // Falls mal eine Zeile ohne Audio existiert: nicht blockieren
    audio.src = "";
    setTimeout(onEnd, 900);
    return;
  }

  audio.src = line.audio;

  audio.play().catch(() => {
    // Autoplay-Block: Wenn Ton nicht startet, klickt der Lehrer einmal "Weiter".
  });

  audio.onended = onEnd;

  // Wenn Datei fehlt (404), feuert onerror -> wir gehen trotzdem weiter
  audio.onerror = () => onEnd();
}

/**********************
 * 6) RENDER AUS STATE
 **********************/
function renderFromState(state) {
  const scene = scenes[state.sceneIndex];
  const line = scene.lines[state.lineIndex];

  $("sceneTitle").innerText = scene.title;

  // Bild Fade
  const img = $("sceneImage");
  img.classList.add("fade");
  setTimeout(() => {
    img.src = scene.image;
    img.alt = scene.title;
    img.classList.remove("fade");
  }, 180);

  // Dialog "bump"
  const box = $("dialogBox");
  box.classList.remove("bump");
  void box.offsetWidth;
  box.classList.add("bump");

  // Text / Sprecher
  if (line.sfx) {
    $("dialogSpeaker").innerText = "";
    $("dialogSpeaker").className = "";
    $("dialogText").innerText = "";
  } else {
    $("dialogSpeaker").innerText = line.speaker;
    $("dialogSpeaker").className = `speaker-${line.speaker}`;
    typeText($("dialogText"), line.text);
  }

  // Buttons nur Lehrer
  $("controls").style.display = isTeacher() ? "block" : "none";
  $("toggleAutoBtn").innerText = `⏯ Autoplay: ${autoPlay ? "AN" : "AUS"}`;

  // Audio abspielen (alle hören das), aber nur Lehrer darf weiterschalten
  playLineAudio(line, () => {
    if (isTeacher() && autoPlay && !atEnd(state)) {
      const ns = nextState(state);
      stateRef.set({ ...ns, ts: Date.now() });
    }
  });
}

/**********************
 * 7) MULTIPLAYER: STATE LISTENER
 **********************/
stateRef.on("value", (snap) => {
  const state = snap.val();

  // Wenn noch kein State existiert: Lehrer kann initial setzen,
  // aber wir setzen hier nichts automatisch.
  if (!state || typeof state.sceneIndex !== "number") {
    $("liveStatus").innerText = "🟡 Warte auf Lehrer…";
    return;
  }

  $("liveStatus").innerText = "🟢 Live";
  renderFromState(state);
});

/**********************
 * 8) STEUERUNG
 **********************/
function chooseRole(r) {
  role = r;

  $("startScreen").style.display = "none";
  $("gameScreen").style.display = "block";
  $("roleText").innerText = "🎭 Deine Rolle: " + role;

  // Lehrer setzt einmal Initial-State, falls leer
  if (isTeacher()) {
    stateRef.get().then((snap) => {
      if (!snap.exists()) {
        stateRef.set({ sceneIndex: 0, lineIndex: 0, ts: Date.now() });
      }
    });
  }
}

function nextLine() {
  if (!isTeacher()) return;
  stateRef.get().then((snap) => {
    const state = snap.val();
    if (!state) return;
    const ns = nextState(state);
    stateRef.set({ ...ns, ts: Date.now() });
  });
}

function prevLine() {
  if (!isTeacher()) return;
  stateRef.get().then((snap) => {
    const state = snap.val();
    if (!state) return;
    const ps = prevState(state);
    stateRef.set({ ...ps, ts: Date.now() });
  });
}

function toggleAuto() {
  if (!isTeacher()) return;
  autoPlay = !autoPlay;
  $("toggleAutoBtn").innerText = `⏯ Autoplay: ${autoPlay ? "AN" : "AUS"}`;
}

// Global fürs HTML
window.chooseRole = chooseRole;
window.nextLine = nextLine;
window.prevLine = prevLine;
window.toggleAuto = toggleAuto;
