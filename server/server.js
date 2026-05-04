const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

console.log("Server running on ws://localhost:3000");

wss.on("connection", (ws) => {
  console.log("Player connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
  });

  ws.send(JSON.stringify({
    type: "welcome",
    message: "hello player"
  }));
});