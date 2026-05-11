const socket = new WebSocket("ws://localhost:3000");

export let worldState = {};
export let playerId = null;
export const snapshots = [];

socket.onopen = () => {
  console.log("Connected to server");
};

socket.onmessage = (event) => {

  console.log("RAW MSG:", event.data);

  const data = JSON.parse(event.data);

  if (data.type === "init") {
    playerId = data.id;
  }

  if (data.type === "state") {

    snapshots.push({
      time: data.time,
      players: structuredClone(data.players)
    });

    if (snapshots.length > 10) {
      snapshots.shift();
    }

    worldState =
      structuredClone(data.players);
  }
};

export function sendMove(x, y) {
  socket.send(JSON.stringify({
    type: "move",
    x,
    y
  }));
}