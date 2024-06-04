class AppError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.status = `${this.statusCode}`.startsWith("5") ? "error" : "fail"; // if the status code is 500 then internal server error otherwise fail
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
