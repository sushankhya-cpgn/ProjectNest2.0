const express = require("express");
const morgan = require("morgan");
const userRouter = require("./router/userRoute");
const projectreqRouter = require("./router/projectreqRouter");
const projectRouter = require("./router/projectRouter");
const eventRouter = require("./router/eventRouter");
const errorController = require("./controller/errorController");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/api/v2/project", projectRouter);
app.use("/api/v2/user", userRouter);
app.use("/api/v2/event", eventRouter);
app.use("/api/v2/projectreq", projectreqRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `The route ${req.originalUrl} is not defined in this server`,
  });
});
//if error
app.use(errorController);
module.exports = app;
