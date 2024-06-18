const mongoose = require("mongoose");
const ProjectReq = require("./projectReqModel");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project must have a name"],
    },
    semester: {
      type: Number,
      validate: {
        validator: function (val) {
          if (!Number.isInteger(val)) return false;
          return !(val < 1 || val > 8);
        },
        message: "{VALUE} is not a valid semester number",
      },
    },
    reportFile: String,
    proposalFile: String,
    description: String,
    technologyUsed: [String],
    supervisor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    submissionDate: Date,
    startDate: Date,
    active: {
      type: Boolean,
      default: true,
    },
    proposal: {
      type: mongoose.Schema.ObjectId,
      ref: "ProjectReq",
    },
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
    tasks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Task",
      },
    ],
    // rooms: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Room",
    //   },
    // ],
    // ganttChart: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "GanttChart",
    // },
    // logSheets: [
    //   {
    //     date: {
    //       type: Date,
    //       required: [true, "date is required"],
    //     },
    //     log: {
    //       type: mongoose.Schema.ObjectId,
    //       ref: "Log",
    //     },
    //     active: {
    //       type: Boolean,
    //       default: true,
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

// creating rooms for the project
// projectSchema.pre("save", async function (next) {
//   if (!this.isNew) return next();

//   // inserting rooms
//   const members = this.members.map((mem) => mem);
//   const supervisedMembers = members.map((mem) => mem);
//   if (this.supervisor) supervisedMembers.push(this.supervisor);
//   const supervisedRoomData = {
//     name: `${this.name.split(" ").join("-")}-supervised-team-room`,
//     roomtype: "supervised-team-room",
//     members: supervisedMembers,
//   };
//   const supervisedRoom = await Room.create(supervisedRoomData);
//   const teamRoomData = {
//     name: `${this.name.split(" ").join("-")}-members-team-room`,
//     roomtype: "members-team-room",
//     members,
//   };
//   const teamRoom = await Room.create(teamRoomData);

//   if (!supervisedRoom || !teamRoom) {
//     return next(new AppError(500, "somethinge went wrong please try again"));
//   }
//   this.rooms.push(supervisedRoom.id);
//   this.rooms.push(teamRoom.id);
//   next();
// });

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
