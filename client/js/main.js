import "./input.js";

import { render } from "./renderer.js";

// ----------------------
// CLIENT UPDATE LOOP
// ----------------------
function update() {
  // later:
  // prediction
  // interpolation
  // client-side movement
}

setInterval(update, 1000 / 20);

// ----------------------
// RENDER LOOP
// ----------------------
function loop() {
  render();

  requestAnimationFrame(loop);
}

loop();

console.log("loop running");