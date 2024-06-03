const http = require("http");
const { Server } = require("socket.io");
const { mongoose } = require("mongoose");
const app = require("./app");

// const httpServer = http.createServer(app);
const io = new Server({
  cors: true,
});

const rooms = [];
const roomMessages = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("join-room", (data) => {
    const { roomId, username } = data;
    console.log("request to join rooom: ", roomId, username);
    if (!rooms.includes(roomId)) {
      rooms.push(roomId);
      roomMessages[roomId] = [];
      socket.emit("room-joined", {
        roomId,
        username,
        date: new Date().toDateString(),
      });
    }
  });
  socket.on("send-message", (data) => {
    const messageObject = {
      username: data.username,
      message: data.message,
      data: new Date(),
    };
    roomMessages[data.roomId].push(messageObject);
    // console.log(roomMessages);
    socket.emit("message-sent", messageObject);
  });
});

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then((conInstance) => {
    console.log("connected to database...");
    process.env.NODE_ENV === "development" &&
      console.log(`DB Hosted By: ${conInstance.connection.host}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `${process.env.NODE_ENV.toUpperCase()}: Listening on port ${PORT}...`
  );
});

io.listen(8001);
