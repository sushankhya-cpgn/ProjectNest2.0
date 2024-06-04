const AppError = require("../utils/appError");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const Project = require("../models/projectModel");
exports.getAllUsers = catchAsync(async (req, res, next) => {
  let query = {};
  if (req.query.role) {
    query.role = req.query.role;
  }
  if (req.query.email) {
    const emailRegx = new RegExp(req.query.email, "i");
    query.email = emailRegx;
  }
  const users = await User.find(query);
  res.status(200).json({
    status: "success",
    total: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new AppError(404, "no user found"));
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUserProjects = catchAsync(async (req, res, next) => {
  await req.user.populate({
    path: "projects",
    model: "Project",
    select: "name id semester",
  });
  res.status(200).json({
    status: "success",
    total: req.user.projects.length,
    projects: req.user.projects,
  });
});
