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
    joinrequests: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    teamMembers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },
    resources: {
      type: String,
    },

    proposalPDF: {
      type: String,
    },
    semester: {
      type: Number,
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
