const express = require("express");
const userRouter = require("./router/userRoute");
const projectreqRoutes = require("./router/projectreqRouter");
const projectRouter = require("./router/projectRouter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v2/project", projectRouter);

app.use("/api/v2/user", userRouter);

app.use("/api/v1/projectreq", projectreqRoutes);
app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `The route ${req.originalUrl} is not defined in this server`,
  });
});

module.exports = app;
