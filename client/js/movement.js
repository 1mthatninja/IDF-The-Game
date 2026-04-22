import { state } from "./state.js";

export function updateMovement() {
  let dx = state.targetX - state.playerX;
  let dy = state.targetY - state.playerY;

  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > 2) {
    dx /= dist;
    dy /= dist;

    state.playerX += dx * state.speed;
    state.playerY += dy * state.speed;
  }

  const game = document.getElementById("game");

  state.playerX = Math.max(0, Math.min(game.clientWidth - 30, state.playerX));
  state.playerY = Math.max(0, Math.min(game.clientHeight - 30, state.playerY));
}