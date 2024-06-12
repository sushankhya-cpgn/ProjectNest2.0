const http = require("http");
const { Server } = require("socket.io");
const { mongoose } = require("mongoose");
const app = require("./app");

// const httpServer = http.createServer(app);
const io = new Server({
  cors: true,
});

const roomMessages = {};

const rooms = {
  73930385: [],
};

io.on("connection", (socket) => {
  // console.log("a user connected");
  socket.on("join-room", (data) => {
    const { projectId } = data;
    socket.join(projectId);
    console.log("user joined the room", projectId);
  });
  socket.on("send-message", (data) => {
    console.log(data);
    io.to(data.roomId).emit("receive-message", data);
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
