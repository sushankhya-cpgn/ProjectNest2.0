const mongoose = require("mongoose");

const projectReqSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "A project must have an id"],
  },

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
    required: [true, "A project request must have a solution"],
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

  proposal: {
    type: String,
  },

  createdBy: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectReq = mongoose.model("ProjectReq", projectReqSchema);

module.exports = ProjectReq;
