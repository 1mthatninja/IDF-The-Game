const WebSocket = require("ws");

const { createPlayer } = require("./players");

const {
  world,
  movePlayerToRoom
} = require("./rooms");

// ----------------------
// WEBSOCKET SERVER
// ----------------------
const wss = new WebSocket.Server({ port: 3000 });

// ----------------------
// CONNECTIONS
// ----------------------
wss.on("connection", (ws) => {

  const id =
    Math.random().toString(36).slice(2);

  ws.id = id;
  ws.room = "lobby";

  world.lobby.players[id] =
    createPlayer();

  // INIT
  ws.send(JSON.stringify({
    type: "init",
    id
  }));

  // ----------------------
  // MESSAGES
  // ----------------------
  ws.on("message", (msg) => {

    const data =
      JSON.parse(msg);

    if (data.type === "move") {

      const player =
        world[ws.room].players[ws.id];

      if (!player) return;

      player.targetX = data.x;
      player.targetY = data.y;
    }

    if (data.type === "joinRoom") {

      const newRoom =
        data.room;

      if (!world[newRoom]) return;

      const spawn =
        world[newRoom].spawn;

      movePlayerToRoom(
        ws,
        ws.id,
        ws.room,
        newRoom,
        spawn
      );
    }
  });

  // ----------------------
  // DISCONNECT
  // ----------------------
  ws.on("close", () => {

    delete world[ws.room].players[ws.id];
  });
});

// ----------------------
// BROADCAST WORLD STATE
// ----------------------
function broadcastWorldState() {

  wss.clients.forEach(client => {

    if (client.readyState !== WebSocket.OPEN)
      return;

    const room =
      world[client.room];

    if (!room) return;

    client.send(JSON.stringify({
      type: "state",
      time: Date.now(),
      players: structuredClone(room.players),
      room: client.room,
      exits: room.exits
    }));
  });
}

module.exports = {
  wss,
  broadcastWorldState
};