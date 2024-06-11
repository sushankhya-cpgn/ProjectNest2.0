const express = require("express");
const router = express.Router();
const projectreqController = require("../controller/projectreqController.js");
const authController = require("../controller/authController.js");

router
  .route("/")
  .get(authController.protect, projectreqController.getAllProjectsProposals)
  .post(authController.protect, projectreqController.addProject);

router
  .route("/my-project-proposal")
  .get(authController.protect, projectreqController.getMyProjectProposal);

router
  .route("/joinrequest/:id")
  .patch(authController.protect, projectreqController.projectJoinRequest);

router
  .route("/acceptjoinrequest/:id")
  .patch(authController.protect, projectreqController.acceptProjectJoinRequest);

router
  .route("/:id/proposal")
  .patch(
    authController.protect,
    projectreqController.uploadProposalPdf,
    projectreqController.uploadProjectProposal
  );
router
  .route("/:id")
  .get(projectreqController.getProject)
  .patch(projectreqController.updateProject)
  .delete(projectreqController.deleteProject);

module.exports = router;
