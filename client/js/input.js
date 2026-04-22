import { state } from "./state.js";

window.addEventListener("DOMContentLoaded", () => {
  const game = document.getElementById("game");

  document.addEventListener("click", (e) => {
    const rect = game.getBoundingClientRect();

    state.targetX = e.clientX - rect.left;
    state.targetY = e.clientY - rect.top;
  });
});