let role = "";
let sceneIndex = 0;
let lineIndex = 0;

// ✅ Autoplay: geht weiter, wenn Audio endet (nur Lehrer)
let autoPlay = true;

// Zähler für deine Sprecher-Audios (tim1, tim2, ... usw.)
let countTim = 0;
let countLea = 0;
let countLehrer = 0;

const scenes = [
  {
    title: "Szene 1 – Der Beginn",
    image: "images/klasse.jpg",
    lines: [
      { speaker: "SFX", audio: "sounds/glocke.mp3" },
      { speaker: "Lehrer", text: "So, Kinder. Heute reisen wir zurück ins 18. Jahrhundert. Bitte schaltet eure Gehirne ein." },
      { speaker: "SFX", audio: "sounds/papier.mp3" },
      { speaker: "Tim", text: "Herr Lehrer… ist WLAN vorhanden?" },
      { speaker: "Lehrer", text: "Nein, aber Philosophen." },
      { speaker: "Tim", text: "Dann wird’s hart." },
      { speaker: "Lea", text: "Wir sprechen über Friedrich II., oder?" },
      { speaker: "Lehrer", text: "Ganz genau! Auch genannt Friedrich der Große." },
      { speaker: "SFX",  audio: "sounds/floete.mp3" },
      { speaker: "Tim", text: "Warum läuft hier Mittelalter-Spotify?" },
      { speaker: "Lehrer", text: "Friedrich spielte Flöte. Sehr gut sogar." },
      { speaker: "Tim", text: "Krieger… und Musiker? Multitasking-King." }
    ]
  },
  {
    title: "Szene 2 – Der aufgeklärte Absolutismus",
    image: "images/friedrich.jpg",
    lines: [
      { speaker: "Lehrer", text: "Friedrich war ein aufgeklärter Absolutist." },
      { speaker: "Tim", text: "Klingt wie ein Boss-Gegner." },
      { speaker: "Lea", text: "Heißt: Er las Aufklärer wie Voltaire, glaubte an Vernunft… …aber regierte alleine." },
      { speaker: "Lehrer", text: "Sehr gut! Er sagte: „Ich bin der erste Diener des Staates.“" },
      { speaker: "Tim", text: "Wenn ich das sage, muss ich trotzdem den Müll rausbringen." },
      { speaker: "Lehrer", text: "Friedrich nicht. Er hatte den Staat." }
    ]
  },
  {
    title: "Szene 3 – Reformen & Kartoffeln",
    image: "images/kartoffel.jpg",
    lines: [
      { speaker: "Lehrer", text: "Friedrich reformierte Preußen massiv: bessere Verwaltung, weniger Willkür, mehr Schulen, Kartoffeln für alle!" },
      { speaker: "Tim", text: "Moment… ohne Friedrich keine Pommes?" },
      { speaker: "Lea", text: "Keine Pommes. Keine Chips. Keine Ofenkartoffeln." },
      { speaker: "Tim", text: "Okay, ich respektiere ihn." },
      { speaker: "Lehrer", text: "Außerdem: Religionsfreiheit, Folter abgeschafft, Beamte nach Leistung, nicht nur Adel." },
      { speaker: "Tim", text: "Also fair… für damalige Verhältnisse." },
      { speaker: "Lehrer", text: "Genau. Für damals." }
    ]
  },
  {
    title: "Szene 4 – Der Militärkönig",
    image: "images/krieg.jpg",
    lines: [
      { speaker: "SFX",  audio: "sounds/krieg.mp3" },
      { speaker: "Lea", text: "Aber er war auch dauernd im Krieg." },
      { speaker: "Lehrer", text: "Ja. Friedrich liebte Ordnung… und Kanonen." },
      { speaker: "Tim", text: "Warum?" },
      { speaker: "Lehrer", text: "Weil Preußen sonst untergegangen wäre. Kleiner Staat, viele Feinde." },
      { speaker: "Lehrer", text: "Schlesische Kriege, Siebenjähriger Krieg… Er gewann fast alles – gegen alle Erwartungen." },
      { speaker: "Tim", text: "Also Mathe war schlecht, Krieg war gut?" },
      { speaker: "Lehrer", text: "Sehr verkürzt – aber ja." }
    ]
  },
  {
    title: "Szene 5 – Die Müller-Arnold-Affäre",
    image: "images/gericht.jpg",
    lines: [
      { speaker: "SFX", audio: "sounds/gericht.mp3" },
      { speaker: "Lehrer", text: "Jetzt kommt die berühmte Müller-Arnold-Affäre!" },
      { speaker: "Tim", text: "Endlich Drama." },
      { speaker: "Lea", text: "Ein Müller wurde ungerecht verurteilt, weil ein Adliger ihn verklagt hatte." },
      { speaker: "Lehrer", text: "Friedrich greift ein und ruft: „In meinem Staat herrscht GERECHTIGKEIT!“" },
      { speaker: "Tim", text: "Ehrenmann!" },
      { speaker: "Lehrer", text: "Ja… aber er mischte sich in die Justiz ein." },
      { speaker: "Lea", text: "Also eigentlich genau das, was er sonst verbieten wollte." },
      { speaker: "Lehrer", text: "Widerspruch detected." },
      
    ]
  },
  {
    title: "Szene 6 – Toleranz mit Grenzen",
    image: "images/friedrich.jpg",
    lines: [
      { speaker: "SFX",  audio: "sounds/ruhig.mp3" },
      { speaker: "Lehrer", text: "Friedrich war religiös tolerant." },
      { speaker: "Tim", text: "Jeder darf glauben, was er will?" },
      { speaker: "Lehrer", text: "Fast. Christen, Muslime, Juden… theoretisch." },
      { speaker: "Lea", text: "Aber Juden hatten trotzdem Nachteile." },
      { speaker: "Lehrer", text: "Leider ja. Friedrich war aufgeklärt – aber nicht frei von Vorurteilen." },
      { speaker: "Tim", text: "Also Update verfügbar, aber Bugs noch drin." },
      { speaker: "Lehrer", text: "Perfekte Zusammenfassung." }
    ]
  },
  {
    title: "Szene 7 – Fazit",
    image: "images/fazit.jpg",
    lines: [
      { speaker: "SFX", audio: "sounds/ruhig.mp3" },
      { speaker: "Lehrer", text: "Friedrich II. war: Reformer, Militärstratege, Musiker, Philosoph, Autokrat." },
      { speaker: "Lea", text: "Ein Mensch voller Widersprüche." },
      { speaker: "Tim", text: "Aber ohne ihn kein modernes Preußen." },
      { speaker: "Lehrer", text: "Genau. Er brachte Ordnung, Bildung und Verwaltung – aber Freiheit erst viel später." },
      { speaker: "SFX",  audio: "sounds/glocke.mp3" },
      { speaker: "Tim", text: "Also… Test nächste Woche?" },
      { speaker: "Lehrer", text: "Natürlich." },
      { speaker: "SFX", audio: "sounds/schock.mp3" }
    ]
  }
];

function $(id) {
  return document.getElementById(id);
}

function isTeacher() {
  return role === "Lehrer";
}

function atAbsoluteEnd() {
  return sceneIndex === scenes.length - 1 &&
    lineIndex === scenes[sceneIndex].lines.length - 1;
}

function atAbsoluteStart() {
  return sceneIndex === 0 && lineIndex === 0;
}

// Für Zeilen ohne explizites audio: -> automatisch tim1, lehrer1, lea1
function assignSpeakerAudioIfMissing(line) {
  if (line.audio) return; // schon vorhanden (SFX etc.)

  if (line.speaker === "Tim") {
    countTim += 1;
    line.audio = `sounds/tim${countTim}.mp3`;
  } else if (line.speaker === "Lea") {
    countLea += 1;
    line.audio = `sounds/lea${countLea}.mp3`;
  } else if (line.speaker.startsWith("Lehrer")) {
    countLehrer += 1;
    line.audio = `sounds/lehrer${countLehrer}.mp3`;
  }
}

// Audio-Element
function playLineAudio(line) {
  const audioEl = $("sceneAudio");
  if (!audioEl) return;

  audioEl.onended = null;
  audioEl.pause();
  audioEl.currentTime = 0;

  if (!line.audio) return;

  audioEl.src = line.audio;

  audioEl.play().catch(() => {
    // Browser blockiert Autoplay bis ein Klick passiert – dann einmal "Weiter" klicken
  });

  // ✅ Autoplay: wenn Audio vorbei → nächste Zeile
  audioEl.onended = () => {
    if (isTeacher() && autoPlay && !atAbsoluteEnd()) {
      nextLine();
    }
  };
}

function render() {
  const scene = scenes[sceneIndex];
  const line = scene.lines[lineIndex];

  // Titel + Bild
  $("sceneTitle").innerText = scene.title;
  const img = $("sceneImage");
  img.src = scene.image;
  img.alt = scene.title;

  // Text
  $("dialogSpeaker").innerText = line.speaker;
  $("dialogText").innerText = line.text;

  // Buttons
  if ($("prevBtn")) $("prevBtn").disabled = atAbsoluteStart();
  if ($("nextBtn")) $("nextBtn").disabled = atAbsoluteEnd();

  // Audio automatisch zuweisen, falls Sprecher und kein audio angegeben
  assignSpeakerAudioIfMissing(line);

  // Audio abspielen
  playLineAudio(line);
}

function chooseRole(r) {
  role = r;

  $("startScreen").style.display = "none";
  $("gameScreen").style.display = "block";
  $("roleText").innerText = "🎭 Deine Rolle: " + role;

  // Nur Lehrer steuert Buttons
  $("controls").style.display = isTeacher() ? "block" : "none";

  // Reset
  sceneIndex = 0;
  lineIndex = 0;

  // Zähler zurücksetzen (wichtig, damit tim1.. immer gleich bleibt)
  countTim = 0;
  countLea = 0;
  countLehrer = 0;

  render();
}

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

// Optional: Autoplay an/aus per Taste "A" (nur Lehrer)
document.addEventListener("keydown", (e) => {
  if (!isTeacher()) return;
  if (e.key.toLowerCase() === "a") {
    autoPlay = !autoPlay;
    alert("Autoplay: " + (autoPlay ? "AN" : "AUS"));
  }
});

// Global für HTML
window.chooseRole = chooseRole;
window.nextLine = nextLine;
window.prevLine = prevLine;
