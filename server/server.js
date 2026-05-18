console.log("SERVER FILE LOADED");

const { movePlayer } =
  require("./movement");

const { checkExit } =
  require("./interactionSystem");

const {
  world,
  movePlayerToRoom
} = require("./rooms");

const {
  wss,
  broadcastWorldState
} = require("./networkServer");

// ----------------------
// WORLD UPDATE LOOP
// ----------------------
function updateWorld() {

  for (const roomName in world) {

    const room = world[roomName];

    for (const id in room.players) {

      const player =
        room.players[id];

      // movement
      movePlayer(player);

      // exit detection
      const exit =
        checkExit(player, roomName);

      // no exit touched
      if (!exit) {
        continue;
      }

      // exit target
      const target =
        exit.spawn;

      const dx =
        player.x - target.x;

      const dy =
        player.y - target.y;

      const dist =
        Math.sqrt(dx * dx + dy * dy);

      // reached exit
      if (dist < 5) {

        const client =
          [...wss.clients]
            .find(c => c.id === id);

        // valid room + valid socket
        if (
          client &&
          world[exit.to]
        ) {

          movePlayerToRoom(
            client,
            id,
            roomName,
            exit.to,
            exit.spawn
          );
        }
      }
    }
  }
}

// ----------------------
// MAIN LOOP
// ----------------------
setInterval(() => {

  updateWorld();

  broadcastWorldState();

}, 50);

console.log(
  "Server running on ws://localhost:3000"
);