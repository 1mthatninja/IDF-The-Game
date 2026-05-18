import {
  stateBuffer,
  playerId,
  exits,
  currentRoom,
  sendMove
} from "./network.js";

const canvas =
  document.getElementById("game");

const ctx =
  canvas.getContext("2d");

// ----------------------
// INTERNAL GAME SIZE
// ----------------------
const GAME_WIDTH = 1520;
const GAME_HEIGHT = 960;

// ----------------------
// DEBUG
// ----------------------
const DEBUG = false;

// ----------------------
// MOUSE
// ----------------------
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", (e) => {

  const rect =
    canvas.getBoundingClientRect();

  // convert screen coords
  // -> world coords
  const scaleX =
    canvas.width / rect.width;

  const scaleY =
    canvas.height / rect.height;

  mouseX =
    (e.clientX - rect.left) * scaleX;

  mouseY =
    (e.clientY - rect.top) * scaleY;
});

// ----------------------
// CLICK EXITS
// ----------------------
canvas.addEventListener("click", () => {

  for (const exit of exits) {

    const hovered =
      mouseX > exit.x &&
      mouseX < exit.x + exit.w &&
      mouseY > exit.y &&
      mouseY < exit.y + exit.h;

    if (hovered) {

      sendMove(
        exit.spawn.x,
        exit.spawn.y
      );

      break;
    }
  }
});

// ----------------------
// FIXED INTERNAL RESOLUTION
// ----------------------
function resize() {

  canvas.width =
    GAME_WIDTH;

  canvas.height =
    GAME_HEIGHT;
}

resize();

window.addEventListener(
  "resize",
  resize
);

// ----------------------
// BACKGROUNDS
// ----------------------
const backgrounds = {

  lobby: loadImage(
    "assets/bg.png"
  ),

  room1: loadImage(
    "assets/room1.png"
  )
};

function loadImage(src) {

  const img = new Image();

  img.src = src;

  return img;
}

// ----------------------
// SNAPSHOT FINDER
// ----------------------
function getSnapshots(time) {

  let a = null;
  let b = null;

  for (
    let i = 0;
    i < stateBuffer.length - 1;
    i++
  ) {

    const s1 =
      stateBuffer[i];

    const s2 =
      stateBuffer[i + 1];

    if (
      s1.time <= time &&
      time <= s2.time
    ) {

      a = s1;
      b = s2;

      break;
    }
  }

  return { a, b };
}

// ----------------------
// EXITS
// ----------------------
function drawExits() {

  for (const exit of exits) {

    const hovered =
      mouseX > exit.x &&
      mouseX < exit.x + exit.w &&
      mouseY > exit.y &&
      mouseY < exit.y + exit.h;

    if (hovered) {

      ctx.fillStyle =
        "rgba(255,255,0,0.35)";

      ctx.fillRect(
        exit.x,
        exit.y,
        exit.w,
        exit.h
      );
    }

    if (DEBUG) {

      ctx.strokeStyle =
        "yellow";

      ctx.strokeRect(
        exit.x,
        exit.y,
        exit.w,
        exit.h
      );
    }
  }
}

// ----------------------
// PLAYERS
// ----------------------
function drawPlayers(players) {

  for (const id in players) {

    const p = players[id];

    ctx.fillStyle =
      id === playerId
        ? "blue"
        : "red";

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
}

// ----------------------
// MAIN RENDER
// ----------------------
export function render() {

  ctx.clearRect(
    0,
    0,
    GAME_WIDTH,
    GAME_HEIGHT
  );

  // ----------------------
  // ROOM BACKGROUND
  // ----------------------
  const bg =
    backgrounds[currentRoom];

  if (bg && bg.complete) {

    ctx.drawImage(
      bg,
      0,
      0,
      GAME_WIDTH,
      GAME_HEIGHT
    );
  }

  // ----------------------
  // EXITS
  // ----------------------
  drawExits();

  // ----------------------
  // INTERPOLATION
  // ----------------------
  const renderTime =
    Date.now() - 100;

  const { a, b } =
    getSnapshots(renderTime);

  // fallback
  if (!a || !b) {

    const latest =
      stateBuffer[
        stateBuffer.length - 1
      ];

    if (
      !latest ||
      !latest.players
    ) return;

    drawPlayers(
      latest.players
    );

    return;
  }

  const alpha =
    (renderTime - a.time) /
    (b.time - a.time);

  const interpolated = {};

  for (const id in a.players) {

    const p1 =
      a.players[id];

    const p2 =
      b.players[id];

    if (!p1 || !p2) {
      continue;
    }

    interpolated[id] = {

      x:
        p1.x +
        (p2.x - p1.x) * alpha,

      y:
        p1.y +
        (p2.y - p1.y) * alpha
    };
  }

  drawPlayers(interpolated);
}