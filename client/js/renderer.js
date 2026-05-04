import { worldState, playerId } from "./network.js";

const players = {};

export function render() {
  const game = document.getElementById("world");

  Object.keys(worldState).forEach(id => {
    const p = worldState[id];
    if (!p) return;

    let el = players[id];

    // Create ONLY ONCE
    if (!el) {
      el = document.createElement("div");
      el.style.position = "absolute";
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.background = id === playerId ? "blue" : "red";

      game.appendChild(el);
      players[id] = el;
    }

    // Update position only
    el.style.left = p.x + "px";
    el.style.top = p.y + "px";
  });
}