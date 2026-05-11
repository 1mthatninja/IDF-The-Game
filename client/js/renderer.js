import { snapshots, playerId } from "./network.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ----------------------
// BACKGROUND IMAGE
// ----------------------
const bg = new Image();
bg.src = "assets/bg.png";

// ----------------------
// RESIZE
// ----------------------
function resize() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

resize();

window.addEventListener("resize", resize);

// ----------------------
// RENDER
// ----------------------
export function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (bg.complete) {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  }

  const latest =
    snapshots[snapshots.length - 1];

  console.log("LATEST", latest);
  console.log(canvas.width, canvas.height);

  if (!latest) return;

  const state = latest.players;

  for (const id in state) {
    const p = state[id];

    ctx.fillStyle =
      id === playerId ? "blue" : "red";

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      15,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  console.log("RENDERING");
}