const connect = require("./configs/db");
const app = require("./index");
const { Server } = require("socket.io");
const { createServer } = require("http");
const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
  await connect();
  console.log("listening on port", port);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

let onlineUser = new Map();

const reciverId = (userId1, userId2, senderId) => {
  if (userId1 == senderId) return userId2;
  return userId1;
};

io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    socket.join(userId);
    socket.emit("connected");
    onlineUser.set(userId, socket.id);
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log("user join room " + roomId);
  });

  socket.on("send-message", (message) => {
    var chat = message.chat;
    var userId1 = chat.users[0]._id
    var userId2=chat.users[1]._id
    var reciverUserId = reciverId(userId1, userId2, message.sender._id)
    var reciverSoketId=onlineUser.get(reciverUserId)
    console.log(reciverUserId, reciverSoketId);
    console.log(onlineUser)
    socket.to(message.chat._id).emit("message-recived", message);
    socket.to(reciverSoketId).emit("send-notification", message);
  });

  // socket.on("send-message", (notification) => {
  //   var chat = message.chat;
  //   socket.to(message.chat._id).emit("message-recived", message);
  // });
});
