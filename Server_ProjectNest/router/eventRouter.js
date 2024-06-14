const express = require("express");
const router = express.Router();
const eventContorller = require("../controller/eventController");

router
  .route("/")
  .get(eventContorller.getAllEvents)
  .post(eventContorller.addEvent);

module.exports = router;