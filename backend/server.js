const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new server(server, {
  cors: {
    origin: "*", // allow from all
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("log", (data) => {
    console.log("Log:", data);
    // Broadcast logs to all connected clients (dev)
    io.emit("consoleLog", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
