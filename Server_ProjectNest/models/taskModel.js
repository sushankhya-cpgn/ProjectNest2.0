const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    assignedTo: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
    remarks: {
      type: String,
    },
    status: {
      type: String,
      enum: ["progress", "completed"],
      default: "progress",
    },
    grade: {
      type: String,
      enum: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-"],
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
