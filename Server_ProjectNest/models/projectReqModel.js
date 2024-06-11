const mongoose = require("mongoose");

const projectReqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A project request must have a project name"],
    },
    problemStatement: {
      type: String,
      required: [true, "A project request must have a problem statement"],
    },
    solution: {
      type: String,
    },
    techtags: {
      type: [String],
    },
    joinrequests: {
      type: [String],
    },
    teamMembers: {
      type: [String], // Array of team member names or IDs
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    resources: {
      type: String,
    },

    proposalPDF: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ProjectReq = mongoose.model("ProjectReq", projectReqSchema);

module.exports = ProjectReq;
