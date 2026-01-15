let role = "";
let sceneIndex = 0;
let lineIndex = 0;

let autoPlay = true;

// Sprecher-Zähler
let countTim = 0;
let countLea = 0;
let countLehrer = 0;

// Szenen + Dialoge
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

// Helfer
function $(id) {
  return document.getElementById(id);
}

function isTeacher() {
  return role === "Lehrer";
}

function atEnd() {
  return (
    sceneIndex === scenes.length - 1 &&
    lineIndex === scenes[sceneIndex].lines.length - 1
  );
}

// Audio abspielen
function playAudio(src) {
  const audio = $("sceneAudio");
  audio.pause();
  audio.currentTime = 0;
  audio.src = src;

  audio.play().catch(() => {});

  audio.onended = () => {
    if (autoPlay && isTeacher() && !atEnd()) {
      nextLine();
    }
  };
}

// Render
function render() {
  const scene = scenes[sceneIndex];
  const line = scene.lines[lineIndex];

  $("sceneTitle").innerText = scene.title;
  $("sceneImage").src = scene.image;

  // === SOUND EFFECT ===
  if (line.sfx) {
    $("dialogSpeaker").innerText = "";
    $("dialogText").innerText = "";

    playAudio(`sounds/${line.sfx}.mp3`);
    return;
  }

  // === SPRECHER ===
  $("dialogSpeaker").innerText = line.speaker;
  $("dialogText").innerText = line.text;

  let audioFile = "";

  if (line.speaker === "Tim") {
    countTim++;
    audioFile = `sounds/tim${countTim}.mp3`;
  } else if (line.speaker === "Lea") {
    countLea++;
    audioFile = `sounds/lea${countLea}.mp3`;
  } else if (line.speaker === "Lehrer") {
    countLehrer++;
    audioFile = `sounds/lehrer${countLehrer}.mp3`;
  }

  playAudio(audioFile);
}

// Navigation
function nextLine() {
  if (!isTeacher()) return;

  const scene = scenes[sceneIndex];

  if (lineIndex < scene.lines.length - 1) {
    lineIndex++;
  } else if (sceneIndex < scenes.length - 1) {
    sceneIndex++;
    lineIndex = 0;
  }

  render();
}

function prevLine() {
  if (!isTeacher()) return;

  if (lineIndex > 0) {
    lineIndex--;
  } else if (sceneIndex > 0) {
    sceneIndex--;
    lineIndex = scenes[sceneIndex].lines.length - 1;
  }

  render();
}

// Start
function chooseRole(r) {
  role = r;

  $("startScreen").style.display = "none";
  $("gameScreen").style.display = "block";
  $("roleText").innerText = "🎭 Deine Rolle: " + role;

  $("controls").style.display = isTeacher() ? "block" : "none";

  sceneIndex = 0;
  lineIndex = 0;
  countTim = 0;
  countLea = 0;
  countLehrer = 0;

  render();
}

// Global
window.chooseRole = chooseRole;
window.nextLine = nextLine;
window.prevLine = prevLine;
