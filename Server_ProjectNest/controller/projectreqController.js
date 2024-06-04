const ProjectReq = require("../models/projectReqModel"); // Adjust the path if necessary

// Get all project requests
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectReq.find();
    res.status(200).json({
      status: "success",
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Add a new project request
exports.addProject = async (req, res) => {
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
