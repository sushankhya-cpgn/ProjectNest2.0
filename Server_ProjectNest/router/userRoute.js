const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.route("/").get(userController.getAllUsers);

module.exports = router;
