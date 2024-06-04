const express = require("express");
const router = express.Router();
const projectreqController = require("../controller/projectreqController.js");

router
  .route("/")
  .get(projectreqController.getAllProjects)
  .post(projectreqController.addProject);

router
  .route("/:id")
  .get(projectreqController.getProject)
  .patch(projectreqController.updateProject)
  .delete(projectreqController.deleteProject);

module.exports = router;
