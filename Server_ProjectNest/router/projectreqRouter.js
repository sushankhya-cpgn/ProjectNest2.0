const express = require("express");
const router = express.Router();
const projectreqController = require("../controller/projectreqController.js");
const authController = require("../controller/authController.js");

router
  .route("/")
  .get(authController.protect, projectreqController.getAllProjectsProposals)
  .post(authController.protect, projectreqController.addProject);


router
  .route("/proposals")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    projectreqController.getProposalsForApproval
  );

router
  .route("/:id/accept-proposal")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    projectreqController.acceptProjectProposal
  );
router
  .route("/my-project-proposal")
  .get(authController.protect, projectreqController.getMyProjectProposal);
router
  .route("/my-join-requests")
  .get(authController.protect, projectreqController.myJoinRequestsProjects);
router
  .route("/:id/send-join-request")
  .patch(
    authController.protect,
    projectreqController.restrictToStatus("draft"),
    projectreqController.projectJoinRequest
  );

router
  .route("/:id/accept-join-request")
  .patch(
    authController.protect,
    projectreqController.restrictToStatus("draft"),
    projectreqController.acceptProjectJoinRequest
  );

router
  .route("/:id/reject-join-request")
  .patch(
    authController.protect,
    projectreqController.restrictToStatus("draft"),
    projectreqController.rejectProjectJoinRequest
  );

router
  .route("/:id/cancel-join-request")
  .patch(
    authController.protect,
    projectreqController.restrictToStatus("draft"),
    projectreqController.cancelProjectJoinRequest
  );

router
  .route("/:id/proposal-pdf")
  .patch(
    authController.protect,
    projectreqController.restrictToStatus("draft"),
    projectreqController.uploadProposalPdf,
    projectreqController.uploadProjectProposal
  );

router
  .route("/:id/send")
  .patch(
    authController.protect,
    projectreqController.restrictToStatus("draft"),
    projectreqController.sendProjectPropoal
  );

router
  .route("/:id/accept-proposal")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    projectreqController.restrictToStatus("pending"),
    projectreqController.acceptProjectProposal
  );

router
  .route("/:id")
  .get(
    projectreqController.restrictToStatus("draft"),
    projectreqController.getProject
  )
  .delete(
    authController.protect,
    projectreqController.restrictToStatus("draft"),
    projectreqController.deleteProject
  );

module.exports = router;
