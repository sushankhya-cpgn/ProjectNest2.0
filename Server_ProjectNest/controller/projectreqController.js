const ProjectReq = require("../models/projectReqModel"); // Adjust the path if necessary
const catchAsync = require("../utils/catchAsync");
const filterObject = require("../utils/filterObject");
const AppError = require("../utils/appError");
const multer = require("multer");

// Get all project requests

exports.getAllProjectsProposals = catchAsync(async (req, res, next) => {
  const allProjectProposals = await ProjectReq.find();

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
  const projectProposal = await ProjectReq.findOne({ createdBy: req.user.id });
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

  if (!projectProposal)
    return next(new AppError(400, "no project proposal with that id"));

  if (projectProposal.createdBy.toString() === req.user.id)
    next(new AppError(400, "cannot join request your own proposal"));
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

  const newProjectRequestList = projectProposal.joinrequests.filter(
    (rqstor) => rqstor !== requestorUserId
  );
  projectProposal.joinrequests = newProjectRequestList;
  projectProposal.teamMembers.push(requestorUserId);
  await projectProposal.save();
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

exports.uploadProjectProposal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const projectProposal = await ProjectReq.findById(id);
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
    status: "pending",
  });
  if (proposal) {
    return res.status(400).json({
      status: "failed",
      message: "user already has a pending project proposal",
      data: {
        pendingProposal: proposal,
      },
    });
  }
  projectData.createdBy = req.user.id;
  const newProject = await ProjectReq.create(projectData);
  res.status(200).json({
    status: "success",
    data: {
      project: newProject,
    },
  });
});

async (req, res) => {
  try {
    const newProject = await ProjectReq.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        project: newProject,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get a single project request by ID
exports.getProject = async (req, res) => {
  try {
    const project = await ProjectReq.findById(req.params.id);
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

// Delete a project request by ID
exports.deleteProject = async (req, res) => {
  try {
    const project = await ProjectReq.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "No project found with that ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
