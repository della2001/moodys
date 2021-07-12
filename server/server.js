const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io"); 

// setup the port our backend app will run on
const PORT = 3030;
const NEW_MESSAGE_EVENT = "new-message-event";

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: true,
  origins:["localhost:3000"]
});

app.use(cors());

// Hardcoding a room name here. This is to indicate that you can do more by creating multiple rooms as needed.
const room = "general"

io.on("connection", (socket) => {
  socket.join(room);

  socket.on(NEW_MESSAGE_EVENT, (data) => {
    io.in(room).emit(NEW_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    socket.leave(room);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});