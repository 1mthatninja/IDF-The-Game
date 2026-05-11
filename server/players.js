// players.js

const { PLAYER_SPEED } = require("./constants");

function createPlayer() {
  return {
    x: 200,
    y: 200,

    targetX: 200,
    targetY: 200,

    speed: PLAYER_SPEED
  };
}

module.exports = {
  createPlayer
};