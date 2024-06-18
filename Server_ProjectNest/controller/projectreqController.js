const ProjectReq = require("../models/projectReqModel"); // Adjust the path if necessary
const catchAsync = require("../utils/catchAsync");
const filterObject = require("../utils/filterObject");
const AppError = require("../utils/appError");
const multer = require("multer");
const Project = require("../models/projectModel");
const User = require("../models/userModel");

exports.restrictToStatus = function (status) {
  return async (req, res, next) => {
    // const isProjectProposalStatus = await ProjectReq.exists({
    //   _id: req.params.id,
    //   status: status,
    // });
    const isProjectProposalStatus = await ProjectReq.exists({
      _id: req.params.id,
      status: status,
    });
    if (!isProjectProposalStatus) {
      return next(
        new AppError(
          400,
          "Cannot perform any activity on this project as this project is on going!"
        )
      );
    }
    next();
  };
};

// Get all project requests
exports.getAllProjectsProposals = catchAsync(async (req, res, next) => {
  let query = {};
  if (req.query.semester) {
    query.semester = req.query.semester;
  }
  query.status = "draft";
  query.createdBy = { $ne: req.user.id };
  const allProjectProposals = await ProjectReq.find(query).populate({
    path: "createdBy",
    model: "User",
    select: "firstName lastName email photo",
  });

  let filteredProjectProposals = allProjectProposals.filter(
    (projProps) => projProps.teamMembers.length < 4
  );

  res.status(200).json({
    status: "success",
    results: filteredProjectProposals.length,
    data: {
      projectsProposals: filteredProjectProposals,
    },
  });
});

exports.getMyProjectProposal = catchAsync(async (req, res, next) => {
  const projectProposal = await ProjectReq.findOne({ createdBy: req.user.id })
    .populate({
      path: "createdBy",
      model: "User",
      select: "firstName lastName email photo",
    })
    .populate({
      path: "teamMembers",
      model: "User",
      select: "firstName lastName email photo",
    })
    .populate({
      path: "joinrequests",
      model: "User",
      select: "firstName lastName email photo",
    });
  res.status(200).json({
    status: "success",
    data: {
      projectProposal,
    },
  });
});

//by the requestor
exports.projectJoinRequest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const projectProposal = await ProjectReq.findById(id);

  if (!projectProposal) {
    return next(new AppError(400, "no project proposal with that id"));
  }
  if (projectProposal.createdBy.toString() === req.user.id) {
    return next(new AppError(400, "cannot join request your own proposal"));
  }
  if (projectProposal.teamMembers.includes(req.user.id)) {
    return next(new AppError(400, "you are already a member of this project"));
  }
  if (projectProposal.joinrequests.includes(req.user.id)) {
    return next(new AppError(400, "request already sent to this project"));
  }
  if (req.user.projects.length > 0) {
    return next(
      new AppError(
        400,
        "cannot join request, you are already in an active project"
      )
    );
  }
  if (!projectProposal.joinrequests.includes(req.user.id)) {
    projectProposal.joinrequests.push(req.user.id);
    await projectProposal.save();
  }

  res.status(200).json({
    status: "success",
    data: {
      projectProposal,
    },
  });
});
//by the creator
exports.acceptProjectJoinRequest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { requestorUserId } = req.body;
  if (!requestorUserId)
    return next(new AppError(400, "no requestor id is provided"));
  const projectProposal = await ProjectReq.findById(id);
  if (!projectProposal)
    return next(new AppError(400, "no project proposal with that id"));

  if (projectProposal.createdBy.toString() !== req.user.id)
    return next(
      new AppError(
        400,
        "this project propoal is not created by you so you cannot accept the proposal"
      )
    );

  if (!projectProposal.joinrequests.includes(requestorUserId))
    return next(
      new AppError(
        400,
        "provided requestor user has not requested to join the project"
      )
    );
  //checking if requestor has already joined a project
  const requestorProject = await ProjectReq.find({
    teamMembers: requestorUserId,
  });
  if (requestorProject.length > 0) {
    return next(new AppError(400, "requestor has already joind a project"));
  }
  //checking if requestor has created a project
  const projectCreatedByRequestor = await ProjectReq.exists({
    createdBy: requestorUserId,
  });
  if (projectCreatedByRequestor) {
    return next(new AppError(400, "requestor is already in a project"));
  }

  const newProjectRequestList = projectProposal.joinrequests.filter(
    (rqstor) => rqstor.toString() !== requestorUserId
  );
  projectProposal.joinrequests = newProjectRequestList;
  projectProposal.teamMembers.push(requestorUserId);
  await projectProposal.save();
  await projectProposal
    .populate({
      path: "createdBy",
      model: "User",
      select: "firstName lastName email photo",
    })
    .populate({
      path: "teamMembers",
      model: "User",
      select: "firstName lastName email photo",
    })
    .populate({
      path: "joinrequests",
      model: "User",
      select: "firstName lastName email photo",
    });
  res.status(200).json({
    status: "success",
    data: {
      projectProposal,
    },
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
    cb(null, "./public/projectproposals");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname.replaceAll(" ", ""));
  },
});

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadProposalPdf = upload.single("proposal");

//by creator
exports.uploadProjectProposal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const projectProposal = await ProjectReq.findById(id);
  if (!projectProposal) {
    return next(new AppError(400, "no proposal with that id"));
  }
  if (projectProposal.createdBy.toString() !== req.user.id)
    return next(
      new AppError(400, "only project crator can upload the proposal")
    );

  projectProposal.proposalPDF = req.file.filename;
  await projectProposal.save();
  res.status(200).json({
    status: "success",
    data: {
      propsal: projectProposal.proposalPDF,
    },
  });
});

//reject project join request
//by the creator
exports.rejectProjectJoinRequest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { requestorUserId } = req.body;
  if (!requestorUserId)
    return next(new AppError(400, "no requestor id is provided"));
  const projectProposal = await ProjectReq.findById(id);
  if (!projectProposal)
    return next(new AppError(400, "no project proposal with that id"));

  if (projectProposal.createdBy.toString() !== req.user.id)
    return next(
      new AppError(
        400,
        "this project propoal is not created by you so you cannot reject the proposal"
      )
    );

  if (!projectProposal.joinrequests.includes(requestorUserId))
    return next(
      new AppError(
        400,
        "provided requestor user has not requested to join the project"
      )
    );

  //removing from the join request list
  const newProjectRequestList = projectProposal.joinrequests.filter(
    (rqstor) => rqstor.toString() !== requestorUserId
  );

  projectProposal.joinrequests = newProjectRequestList;

  await projectProposal.save();
  res.status(200).json({
    status: "success",
    data: {
      projectProposal,
    },
  });
});

//cancel join request
//by requstor
exports.cancelProjectJoinRequest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const projectProposal = await ProjectReq.findById(id);
  if (!projectProposal)
    return next(new AppError(400, "no project proposal with that id"));
  if (projectProposal.joinrequests.includes(req.user.id)) {
    const newProjectRequestList = projectProposal.joinrequests.filter(
      (rqstor) => rqstor.toString() !== req.user.id
    );
    projectProposal.joinrequests = newProjectRequestList;
    await projectProposal.save();
  }
  res.status(200).json({
    status: "success",
    data: {
      projectProposal,
    },
  });
});

// Add a new project request
exports.addProject = catchAsync(async (req, res, next) => {
  const projectData = filterObject(
    req.body,
    "title",
    "problemStatement",
    "solution",
    "techtags",
    "resources"
  );

  const proposal = await ProjectReq.findOne({
    createdBy: req.user.id,
    status: "draft",
  });
  if (proposal) {
    return next(
      new AppError(400, "user already has a pending project proposal")
    );
  }
  projectData.createdBy = req.user.id;
  projectData.teamMembers = [req.user.id];
  projectData.semester = req.user.semester;
  const newProject = await ProjectReq.create(projectData);
  res.status(200).json({
    status: "success",
    data: {
      project: newProject,
    },
  });
});

// Get a single project request by ID
exports.getProject = catchAsync(async (req, res, next) => {
  const project = await ProjectReq.findById(req.params.id);
  if (!project) {
    return res.status(404).json({
      status: "fail",
      message: "No project found with that ID",
    });
  }
  const projectExists = await ProjectReq.exists({ createdBy: req.user.id });
  let canSendRequest = true;
  if (
    project.joinrequests.includes(req.user.id) ||
    project.teamMembers.includes(req.user.id) ||
    projectExists
  ) {
    canSendRequest = false;
  }

  await project.populate([
    {
      path: "createdBy",
      model: "User",
      select: "firstName lastName email photo",
    },
    {
      path: "teamMembers",
      model: "User",
      select: "firstName lastName email photo",
    },
    {
      path: "joinrequests",
      model: "User",
      select: "firstName lastName email photo",
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      project,
      canSendRequest,
    },
  });
});
// Update a project request by ID
exports.updateProject = async (req, res) => {
  try {
    const project = await ProjectReq.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "No project found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//join requested projects
exports.myJoinRequestsProjects = catchAsync(async (req, res, next) => {
  const projectPorposals = await ProjectReq.find({ joinrequests: req.user.id });
  res.status(200).json({
    status: "success",
    projectPorposals,
  });
});

// Delete a project request by ID
//creator
exports.deleteProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const projectProposal = await ProjectReq.findById(id);
  if (!projectProposal) {
    return next(new AppError(400, "cannot find project proposal with that id"));
  }
  if (projectProposal.createdBy.toString() !== req.user.id) {
    return next(
      new AppError(
        401,
        "you are not the crator of the project so you are not authorized to delete the project proposal"
      )
    );
  }
  await ProjectReq.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    data: [],
  });
});

//only project creator can send the proposal for apporval
exports.sendProjectPropoal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const projectProposal = await ProjectReq.findById(id);
  if (!projectProposal) {
    return next(new AppError(400, "no project proposal with that id"));
  }
  if (projectProposal.createdBy.toString() !== req.user.id) {
    return next(
      new AppError(400, "only project creator can send proposal this request")
    );
  }
  if (!projectProposal.proposalPDF) {
    return next(
      new AppError(
        400,
        "no proposal file is attached with this project proposal"
      )
    );
  }
  projectProposal.status = "pending";
  await projectProposal.save();

  res.status(200).json({
    status: "success",
    projectProposal,
  });
});

exports.getProposalsForApproval = catchAsync(async (req, res, next) => {
  let query = {};
  if (req.query.semester) {
    query.semester = req.query.semester;
  }
  query.status = "pending";
  const proposals = await ProjectReq.find(query);

  res.status(200).json({
    status: "success",
    proposals,
  });
});

//only admin can accept the project propsal
exports.acceptProjectProposal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { supervisor } = req.body;
  const proposal = await ProjectReq.findById(id);
  if (!proposal || proposal.status !== "pending")
    return next(new AppError(400, "no proposal exists"));

  if (!supervisor) {
    return next(new AppError(400, "no supervisor provided"));
  }

  const supervisorExists = await User.exists({
    _id: supervisor,
    role: "supervisor",
  });
  if (!supervisorExists) {
    return next(new AppError(400, "no supervisor with that id"));
  }

  const newProjectData = {
    title: proposal.title,
    semester: proposal.semester,
    proposalFile: proposal.proposalPDF,
    technologyUsed: [...proposal.techtags],
    members: [...proposal.teamMembers],
    proposal: proposal.id,
    supervisor,
  };
  const newProject = await Project.create(newProjectData);
  const ids = newProject.members.map((id) => id.toString());
  const members = await User.find({
    _id: { $in: ids },
  });

  members.forEach(async (memb) => {
    memb.projects.push(newProject.id);
    await memb.save({ validateBeforeSave: false });
  });

  if (newProject) {
    proposal.status = "approved";
    await proposal.save();
  }

  res.status(200).json({
    status: "success",
    project: newProject,
  });
});