const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  // when user enters room the frontend will emit the username and room name to backend
  // add user to array of users
  // emit message to frontend welcoming the new user to chat
  // broadcast to all other users in room that new user has joined
  // send updated room data to all users in room
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
  // when a message is sent from frontend the message and callback are recieved by backend
  // call getUser and get user with id of socket
  // send username and message to all users in room
  // send updated room data to all users in room
  // callback will clear message state in frontend
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });
  // when user leaves room useEffect returns a disconnect notice to backend
  // remove user from array of users
  // send message to all users in room that user has left
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
    }
  });
});

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = httpServer;
