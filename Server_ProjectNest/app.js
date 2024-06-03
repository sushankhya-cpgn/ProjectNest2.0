const express = require("express");
const userRouter = require("./router/userRoute");
const cors = require("cors");

const app = express();
app.use(cors());

app.use("/api/v2/user", userRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `The route ${req.originalUrl} is not defined in this server`,
  });
});
module.exports = app;
