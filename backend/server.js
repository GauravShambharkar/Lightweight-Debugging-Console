const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
  console.log("server is conneted ");

  client.on("log", (data) => {
    console.log("Log:", data);
    // Broadcast logs to all connected clients (dev)
    io.emit("consoleLog", data);
  });

  client.on("error", (data) => {
    console.log("error:", data);

    io.emit("error:", data);
  });

  client.on("disconnect", () => {
    console.log("server disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on ");
});
