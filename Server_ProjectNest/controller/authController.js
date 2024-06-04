const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const filterObject = require("../utils/filterObject");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const roles = require("../utils/userRoles");
const Project = require("../models/projectModel");

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIES_IN,
  });
};

const createSendToken = (statusCode, user, res) => {
  const token = signJWT(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new AppError(400, "both email and password is required to login")
    );
  const user = await User.findOne({ email }).select("+password");
  const validPassword = user
    ? await user.checkPassword(password, user.password)
    : false;
  if (!validPassword || !user) {
    return next(new AppError(401, "email or password is incorrect"));
  }

  createSendToken(200, user, res);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password, confirmPassword } = req.body;
  if (!currentPassword || !password || !confirmPassword)
    return new AppError(
      403,
      "provide all the fields: currentPassword, password and confirm password"
    );

  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.checkPassword(currentPassword, user.password))) {
    return next(new AppError(403, "current password is not correct"));
  }
  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  createSendToken(201, user, res);
});

exports.updateMyInfo = catchAsync(async (req, res, next) => {
  const { firstName, lastName } = req.body;
  let user = await User.findById(req.user.id);
  const newData = {
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
  };
  user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //checking token if it exists and getting it from the http header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError(
        401,
        "you are not logged in, please login to use this feature"
      )
    );
  }
  //verifying the token
  const data = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //checking if the user exists
  const user = await User.findById(data.id);
  if (!user) {
    next(new AppError(404, "user with that token no longer exists"));
  }
  //checking if the user has changed the password after the token was issued
  if (user.passwordChangedAfter(data.iat)) {
    next(new AppError(404, "password was changed, please login again"));
  }

  //grant access to protected route
  req.user = user;

  next();
});

exports.assignRole = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = req.body.role || "student";
  roles.shift();
  if (!roles.includes(role))
    return next(new AppError(400, `cannot assign the role - ${role}`));
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  );
  if (!user) return next(new AppError(400, "user not found"));
  res.status(200).json({
    status: "success",

    data: {
      user,
    },
  });
});

exports.projectMemberRestricted = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) return next(new AppError(400, "no project with that id"));
  if (
    !(
      req.user.id === project.supervisor._id.toString() ||
      project.members.includes(req.user.id)
    )
  ) {
    return next(
      new AppError(
        401,
        "you are not the member of this project so you cannot perform this action"
      )
    );
  }
  req.project = project;
  next();
});

exports.getUserFromToken = catchAsync(async (req, res, next) => {
  const { authtoken } = req.params;
  const data = await promisify(jwt.verify)(authtoken, process.env.JWT_SECRET);
  //checking if the user exists
  const user = await User.findById(data.id);
  if (!user) {
    next(new AppError(404, "user with that token no longer exists"));
  }
  res.status(200).json({
    status: "success",
    user,
  });
});
