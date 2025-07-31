const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { socket } = require("dgram");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connected", (socket) => {
  console.log("server connected");

  socket.on("log", (data) => {
    console.log("log ", data);

    socket.emit("emit console log ", data);
  });

  socket.on("disconected", () => {
    console.log("disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
