import "./input.js";
import { updateMovement } from "./movement.js";
import { render } from "./renderer.js";

function loop() {
  updateMovement();
  render();

  requestAnimationFrame(loop);
}
console.log("loop running");
loop();
