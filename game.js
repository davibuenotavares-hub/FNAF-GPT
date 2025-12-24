let energy = 100;
let time = 0;
let camerasOpen = false;
let cameraIndex = 0;

let doors = {
  left: false,
  right: false
};

const cameras = [
  { name: "Sala Principal", side: "none" },
  { name: "Corredor Esquerdo", side: "left" },
  { name: "Corredor Direito", side: "right" },
  { name: "Depósito", side: "none" }
];

const springbonnie = {
  position: 3,
  aggressiveness: 0.25
};

function updateHUD() {
  document.getElementById("energy").innerText =
    `Energia: ${Math.floor(energy)}%`;

  const hour = 12 + Math.floor(time / 60);
  document.getElementById("time").innerText =
    `${hour > 12 ? hour - 12 : hour}:00 AM`;

  document.getElementById("cameraName").innerText =
    cameras[cameraIndex].name;

  document.getElementById("enemyStatus").innerText =
    springbonnie.position === cameraIndex
      ? "Springbonnie: AQUI"
      : "Springbonnie: —";

  document.getElementById("doorLeftStatus").innerText =
    doors.left ? "Porta E: Fechada" : "Porta E: Aberta";

  document.getElementById("doorRightStatus").innerText =
    doors.right ? "Porta D: Fechada" : "Porta D: Aberta";
}

/* CONTROLES */
function toggleCameras() {
  camerasOpen = !camerasOpen;
  document.getElementById("cameras").style.display =
    camerasOpen ? "flex" : "none";
  energy -= 1;
}

function nextCamera() {
  cameraIndex = (cameraIndex + 1) % cameras.length;
  energy -= 1;
}

function prevCamera() {
  cameraIndex = (cameraIndex - 1 + cameras.length) % cameras.length;
  energy -= 1;
}

function toggleDoor(side) {
  doors[side] = !doors[side];
  energy -= 2;
}

/* IA DO SPRINGBONNIE */
function enemyAI() {
  if (Math.random() < springbonnie.aggressiveness) {
    springbonnie.position--;
  }

  if (springbonnie.position < 0) {
    const side = cameras[1].side; // lado de ataque

    if (
      (springbonnie.position === 0 && !doors.left) ||
      (springbonnie.position === 2 && !doors.right)
    ) {
      showJumpscare();
    } else {
      springbonnie.position = 3;
    }
  }
}

/* LOOP */
setInterval(() => {
  energy -= camerasOpen ? 0.4 : 0.15;
  time++;
  enemyAI();

  if (energy <= 0) {
    alert("Sem energia!");
    location.reload();
  }

  updateHUD();
}, 1000);
function showJumpscare() {
  document.getElementById("jumpscare").style.display = "flex";

  setTimeout(() => {
    location.reload();
  }, 800);
}
