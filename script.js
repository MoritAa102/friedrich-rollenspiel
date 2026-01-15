let role = "";
let scene = 0;

const scenes = [
  "Szene 1: Willkommen im 18. Jahrhundert!",
  "Szene 2: Friedrich der Große erscheint.",
  "Szene 3: Kartoffeln retten Preußen 🥔",
  "Szene 4: Ende 🎬"
];

function chooseRole(r) {
  role = r;
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("roleText").innerText = "Deine Rolle: " + role;
  showScene();
}

function showScene() {
  document.getElementById("sceneText").innerText = scenes[scene];
}

function nextScene() {
  if (role !== "Lehrer") {
    alert("Nur der Lehrer darf weiterschalten!");
    return;
  }
  if (scene < scenes.length - 1) {
    scene++;
    showScene();
  }
}
