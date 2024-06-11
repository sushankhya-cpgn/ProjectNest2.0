const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "something went wrong",
  });
};

//handlers for database errors
const handleDuplicateKeyErrorDB = (err) => {
  const message = `Duplicate field value (${
    err.keyValue[Object.keys(err.keyValue)[0]]
  }) for unique field(${Object.keys(err.keyValue)[0]}) `;
  return new AppError(400, message);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(400, message);
};

const handleValidationErrorsDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  return new AppError(400, `Invalid inputs: ${errors.join(". ")}`);
};

//handlers for JWT errors
const handleInvalidTokenErrorJWT = () => {
  return new AppError(401, "invalid token, please login again");
};
const handleTokenExpireErrorJWT = () => {
  return new AppError(401, "token has expired, please login again");
};

const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(`Error****************************\n`, err);
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(Object.create(Object.getPrototypeOf(err)), err);
    // let error;
    if (err.code === 11000) error = handleDuplicateKeyErrorDB(error);
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorsDB(error);

    if (err.name === "JsonWebTokenError") error = handleInvalidTokenErrorJWT();
    if (err.name === "TokenExpiredError") error = handleTokenExpireErrorJWT();

    sendErrorProd(error, res);
  }
};

module.exports = handleError;
