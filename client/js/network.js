const socket =
  new WebSocket("ws://localhost:3000");

export let playerId = null;

export const stateBuffer = [];

export let exits = [];

export let currentRoom = "lobby";

// ----------------------
// CONNECT
// ----------------------
socket.onopen = () => {
  console.log("Connected to server");
};

// ----------------------
// RECEIVE
// ----------------------
socket.onmessage = (event) => {

  const data =
    JSON.parse(event.data);

  // init
  if (data.type === "init") {

    playerId = data.id;
  }

  // world state
  if (data.type === "state") {

    stateBuffer.push({
      time: data.time,
      players: structuredClone(data.players)
    });

    // keep buffer small
    if (stateBuffer.length > 10) {
      stateBuffer.shift();
    }

    // room data (IMPORTANT: inside state block)
    currentRoom = data.room;

    exits = data.exits || [];
  }
};

// ----------------------
// SEND MOVE
// ----------------------
export function sendMove(x, y) {

  socket.send(JSON.stringify({
    type: "move",
    x,
    y
  }));
}