import { state } from "./state.js";

const player = document.getElementById("player");

export function render() {
  player.style.left = state.playerX + "px";
  player.style.top = state.playerY + "px";
}