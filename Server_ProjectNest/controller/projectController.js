const Project = require("../models/projectModel");
const User = require("../models/userModel");
// const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const filterObject = require("../utils/filterObject");
// const GanttChart = require("../models/ganttChartModel");
// const Week = require("../models/weekModel");
// const Log = require("../models/logModel");
const multer = require("multer");

exports.getAllProjects = catchAsync(async (req, res, next) => {
  let query = {};
  if (req.query.name) {
    query.name = new RegExp(req.query.name, "i");
  }
  if (req.query.status) {
    query.status = req.query.status;
  }
  const projects = await Project.find(query)
    .populate({
      path: "supervisor",
      model: "User",
      select: "firstName lastName email photo",
    })
    .populate({
      path: "members",
      model: "User",
      select: "firstName lastName email photo",
    });
  res.status(200).json({
    status: "success",
    data: {
      total: projects.length,
      projects,
    },
  });
});
//get archived projects by admin
exports.getArchivedProjects = catchAsync(async (req, res, next) => {
  req.query.status = "completed";
  next();
});

//get requestor's project
exports.getAllMyProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find({
    _id: { $in: req.user.projects },
    status: "ongoing",
  }).populate({
    path: "supervisor",
    model: "User",
    select: "firstName lastName email photo",
  });

  res.status(200).json({
    status: "success",
    total: projects.length,
    projects,
  });
});
//get requestor's specific project
exports.getMyProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (
    !project.members.includes(req.user.id) &&
    project.supervisor.toString() !== req.user.id
  ) {
    return next(new AppError(400, "you are not the member of this project"));
  }
  await project.populate([
    {
      path: "supervisor",
      model: "User",
      select: "firstName lastName email photo",
    },
    {
      path: "members",
      model: "User",
      select: "firstName lastName email photo",
    },
  ]);

  res.status(200).json({
    status: "success",
    project,
  });
});

//get techtags
exports.getTechTags = catchAsync(async (req, res, next) => {
  const techTags = [
    "React",
    "Vue",
    "Blockchain",
    "ML/AI",
    "NextJS",
    "NodeJS",
    "Tailwind",
    "HTML",
    "CSS",
    "Python",
    "Django",
    "PyTorch",
    "Pandas",
    "Numpy",
    "Php",
    "Laravel",
  ];
  res.status(200).json({
    statu: "success",
    total: techTags.length,
    techTags,
  });
});

exports.getProjectMembers = catchAsync(async (req, res, next) => {
  const { members } = await Project.findById(req.project).populate({
    path: "supervisor",
    model: "User",
    select: "firstName lastName email photo",
  });
  res.status(200).json({
    status: "success",
    total: members.length,
    members,
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id)
    .populate({
      path: "supervisor",
      model: "User",
      select: "firstName lastName email photo",
    })
    .populate({
      path: "members",
      model: "User",
      select: "firstName lastName email photo",
    });
  if (!project) return next(new AppError(404, "project not found"));
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.getProjectSupervisor = catchAsync(async (req, res, next) => {
  const { supervisor } = await Project.findById(req.project).populate({
    path: "supervisor",
    model: "User",
    select: "firstName lastName email photo",
  });
  res.status(200).json({
    status: "success",
    supervisor,
  });
});

exports.addProject = catchAsync(async (req, res, next) => {
  const projectData = filterObject(
    req.body,
    "name",
    "supervisor",
    "members",
    "semester",
    "submissionDate",
    "description"
  );
  if (projectData.submissionDate) {
    const diff = new Date().getTime() - new Date(projectData.submissionDate);
    if (diff > 0)
      return next(new AppError(400, "submission date is in the past"));
  }
  let supervisor;
  if (projectData.supervisor) {
    supervisor = await User.findById(projectData.supervisor);
    if (!supervisor) return next(new AppError(400, "supervisor doesnot exist"));
    if (supervisor.role !== "supervisor")
      return next(new AppError(400, "not a supervisor"));
  }
  let members;
  if (projectData.members) {
    if (!Array.isArray(projectData.members))
      return next(new AppError(400, "members must be an array of users"));
    const membersPromises = projectData.members.map(async (member) => {
      return await User.findById(member);
    });
    members = await Promise.all(membersPromises);
    if (members.includes(null)) {
      return next(
        new AppError(
          400,
          "one or more of the provided members are not the user"
        )
      );
    }
  }
  const project = await Project.create(projectData);
  members.forEach((member) => {
    member.projects.push(project.id);
  });
  await Promise.all(
    members.map(async (mem) => await mem.save({ validateBeforeSave: false }))
  );
  supervisor.projects.push(project.id);
  await supervisor.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: {
      data: project,
    },
  });
});



exports.deleteProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) return next(new AppError(400, "no project with that id"));
  const deleteRoomsPromises = project.rooms.map(async (room) => {
    return await Room.findByIdAndDelete(room);
  });
  if (project.ganttChart) {
    const ganttChart = await GanttChart.findById(project.ganttChart);
    await Promise.all(
      ganttChart.weeks.map(async (week) => {
        return await Week.findByIdAndDelete(week);
      })
    );
    await GanttChart.findByIdAndDelete(project.ganttChart);
  }
  await Promise.all(deleteRoomsPromises);
  await GanttChart.findByIdAndDelete(project.ganttChart);
  await Project.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

//cannot update project members and supervisor
exports.updateProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.members || req.body.supervisor || req.body.room) {
    delete req.body.members;
    delete req.body.supervisor;
    delete req.body.room;
  }
  const project = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) return next(new AppError(404, "no project with that id"));
  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.addMembers = catchAsync(async (req, res, next) => {
  if (!req.body.newMembers)
    return next(new AppError(400, "please provide an array newMembers"));
  const project = await Project.findById(req.params.id);
  if (!project) return next(new AppError(404, "no project with that id"));

  const supervisedRoom = await Room.findById(project.rooms[0]);
  const membersRoom = await Room.findById(project.rooms[1]);

  const pushMemberesPromises = req.body.newMembers.map(async (member) => {
    if (!project.members.includes(member)) {
      const user = await User.findById(member);
      if (!user)
        return next(new AppError(404, `user with id ${member} does not exist`));
      project.members.push(member);
      user.projects.push(project.id);
      await user.save({ validateBeforeSave: false });
      supervisedRoom.addToRoom(member);
      membersRoom.addToRoom(member);
    }
  });
  await Promise.all(pushMemberesPromises);
  await supervisedRoom.save();
  await membersRoom.save();
  await (
    await project.save()
  ).populate({
    path: "members",
    model: "User",
  });

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.removeMember = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { memberToRemove } = req.body;
  const project = await Project.findById(id);
  if (!project) return next(new AppError(404, "no project with that id"));

  const supervisedRoom = await Room.findById(project.rooms[0]);
  const membersRoom = await Room.findById(project.rooms[1]);

  const index = project.members.indexOf(memberToRemove);
  if (index > -1) {
    project.members.splice(index, 1);
    supervisedRoom.removeFromRoom(memberToRemove);
    membersRoom.removeFromRoom(memberToRemove);
    const member = await User.findById(memberToRemove);
    const remin = member.projects.indexOf(project.id);
    member.projects.splice(remin, 1);
    await member.save({ validateBeforeSave: false });
    await supervisedRoom.save();
    await membersRoom.save();
    await project.save();
  } else {
    return next(
      new AppError(
        400,
        `user with id ${memberToRemove} is not the member of this project`
      )
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.addSupervisor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { supervisor } = req.body;
  const project = await Project.findById(id);
  if (!project) return next(new AppError(404, "no project with that id"));
  if (project.supervisor)
    return next(new AppError(400, "this project already has a supervisor"));
  const user = await User.findById(supervisor);
  if (!user || user.role !== "supervisor")
    return next(new AppError(400, "no supervisor with that id"));
  project.supervisor = supervisor;

  const supervisedRoom = await Room.findById(project.rooms[0]);
  supervisedRoom.addToRoom(supervisor);

  const supervisorObj = await User.findById(supervisor);
  supervisorObj.projects.push(project.id);
  await supervisorObj.save({ validateBeforeSave: false });
  await supervisedRoom.save();
  await project.save();

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.removeSupervisor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) return next(new AppError(404, "no project with that id"));
  const supervisedRoom = await Room.findById(project.rooms[0]);
  supervisedRoom.removeFromRoom(project.supervisor);
  const supervisorObj = await User.findById(project.supervisor);
  supervisorObj.projects.splice(
    supervisorObj.projects.indexOf(project.supervisor),
    1
  );
  await supervisorObj.save({ validateBeforeSave: false });
  project.supervisor = undefined;
  await supervisedRoom.save();
  await project.save();

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.getProjectRooms = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) return next(new AppError(404, "project not found"));
  const roomsPromises = project.rooms.map(async (room) => {
    return await Room.findById(room);
  });
  const rooms = await Promise.all(roomsPromises);
  const finalRooms = [];
  rooms.forEach((room) => {
    room.members.forEach((member) => {
      if (member._id.toString() === req.user.id) finalRooms.push(room);
    });
  });
  if (finalRooms.length === 0)
    return next(new AppError(401, "you are not the member of this project"));
  res.status(200).json({
    status: "success",
    total: finalRooms.length,
    data: {
      rooms: finalRooms,
    },
  });
});

exports.getProjectGanttChart = catchAsync(async (req, res, next) => {
  if (!req.project.ganttChart) {
    return res.status(307).json({
      status: "failed",
      message:
        "this project does not have a gantt chart yet, please send a post request to api/v1/project/{project_id}/gantt-chart to create one",
    });
  }
  const ganttChart = await GanttChart.findById(req.project.ganttChart)
    .populate({
      path: "weeks.week",
      model: "Week",
    })
    .populate({
      path: "lastUpdatedBy",
      model: "User",
      select: "_id firstName email",
    });
  if (!ganttChart) return next(new AppError(404, "cannot find the ganttchart"));
  res.status(200).json({
    status: "success",
    data: {
      ganttChart,
    },
  });
});

exports.addProjectGanttChart = catchAsync(async (req, res, next) => {
  if (req.project.ganttChart)
    return next(new AppError(400, "this project already has a gantt chart"));
  if (req.user.id === req.project.supervisor._id.toString())
    return next(
      new AppError(400, "only project memberes(student) can add gantt chart")
    );
  const weekNos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const weeks = await Promise.all(
    weekNos.map(async (weekno) => {
      return await Week.create({
        from:
          new Date(req.project.createdAt).getTime() + (weekno - 1) * 604800000, //1week = 604800000 ms
        to:
          new Date(req.project.createdAt).getTime() +
          (weekno - 1) * 604800000 +
          6 * 24 * 60 * 60 * 1000,
        taskToDo: [],
      });
    })
  );
  const newWeeks = weeks.map((wk, i) => {
    return {
      weekNo: i + 1,
      week: wk._id,
    };
  });

  // return res.status(200).json({});
  const ganttChartData = {
    totalWeeks: weekNos.length,
    weeks: newWeeks,
  };
  const ganttChart = await GanttChart.create(ganttChartData);
  await ganttChart.populate({
    path: "weeks.week",
    model: "Week",
  });
  await projectGanttChart.populate({
    path: "lastUpdatedBy",
    model: "User",
    select: "_id email firstName",
  });
  const project = await Project.findById(req.project.id);
  project.ganttChart = ganttChart.id;
  await project.save();
  res.status(200).json({
    status: "success",
    ganttchart: ganttChart,
  });
});

exports.getProjectLogSheets = catchAsync(async (req, res, next) => {
  const { logSheets } = await Project.findById(req.project)
    .select("logSheets")
    .populate({
      path: "logSheets.log",
      model: "Log",
    });
  res.status(200).json({
    status: "success",
    total: logSheets.length,
    logSheets,
  });
});

exports.getProjectLogSheet = catchAsync(async (req, res, next) => {
  const { date } = req.params;
  const { logSheets } = await Project.findById(req.project)
    .select("logSheets")
    .populate({
      path: "logSheets.log",
      model: "Log",
    });

  const logSheet = logSheets.find(
    (ls) => new Date(ls.date).getTime() === new Date(date).getTime()
  );
  if (!logSheet)
    return next(new AppError(400, "no logsheet found with that date"));
  // const ls = await Log.findById(logSheet.log).populate({
  //   path: "entries.assignedTo",
  //   model: "User",
  //   select: "firstName lastName email",
  // });

  res.status(200).json({
    status: "success",
    logSheet,
  });
});

exports.addProjectLogSheet = catchAsync(async (req, res, next) => {
  const { date } = req.params;
  date.replace("-", "/");
  const validDate = new Date(date);
  if (isNaN(validDate.getTime()))
    return next(new AppError(400, "invalid date, date format: 'YYYY-MM-DD'"));

  const project = await Project.findById(req.project);
  let index = 0;
  if (
    project.logSheets.some((ls, i) => {
      index = i;
      return ls.active;
    })
  ) {
    return next(
      new AppError(
        400,
        `there is already an active logsheet(${
          new Date(project.logSheets[index].date).toISOString().split("T")[0]
        }), submit that logsheet to make a new one`
      )
    );
  }
  const { entries } = req.body;
  if (!entries) return next(new AppError(400, "please provide data in body"));
  const log = await Log.create({ entries });
  const logSheetData = {
    date: validDate,
    log,
  };
  project.logSheets.push(logSheetData);
  await project.save();
  res.status(200).json({
    status: "success",
    logSheets: project.logSheets,
  });
});

exports.submitProjectLogSheet = catchAsync(async (req, res, next) => {
  const { date } = req.params;
  const project = await Project.findById(req.project)
    .select("logSheets")
    .populate({
      path: "logSheets.log",
      model: "Log",
    });
  let index = -1;

  const logSheet = project.logSheets.find((ls, i) => {
    index = i;
    return new Date(ls.date).getTime() === new Date(date).getTime();
  });
  if (!logSheet)
    return next(new AppError(400, "no logsheet found with that date"));
  if (!logSheet.active) {
    return next(new AppError(400, "this logsheet is already submitted"));
  }

  logSheet.log.entries.forEach((entry) => {
    const newEnt = req.body.entries.find(
      (ent) => ent.assignedTo === entry._id.toString()
    );
    if (newEnt) {
      entry.completedTasks = newEnt.completedTasks;
      entry.present = newEnt.present;
    }
  });
  // project.logSheets[index] = logSheet;
  project.logSheets[index].active = false;
  await project.logSheets[index].log.save();
  await project.save();

  res.status(200).json({
    status: "success",
    data: project.logSheets,
  });
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new AppError(400, "not a pdf file"));
  }
};

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/report");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname.replaceAll(" ", ""));
  },
});

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadReportPdf = upload.single("report");
exports.uploadProposalPdf = upload.single("proposal");
exports.uploadReport = catchAsync(async (req, res, next) => {
  req.project.report = req.file.filename;
  await req.project.save();
  res.status(200).json({
    status: "success",
    data: {
      repoet: req.project.report,
    },
  });
});

exports.getProjectReport = catchAsync(async (req, res, next) => {
  if (!req.project.report) {
    return next(new AppError(404, "no report found"));
  }
  res.status(200).json({
    status: "success",
    data: {
      report: req.project.report,
    },
  });
});
exports.uploadProposal = catchAsync(async (req, res, next) => {
  req.project.proposal = req.file.filename;
  await req.project.save();
  res.status(200).json({
    status: "success",
    data: {
      proopsal: req.project.proposal,
    },
  });
});

exports.getProjectProposal = catchAsync(async (req, res, next) => {
  if (!req.project.proposal) {
    return next(new AppError(404, "no proposal found"));
  }
  res.status(200).json({
    status: "success",
    data: {
      proposal: req.project.proposal,
    },
  });
});
