import { ErrorHandler } from "../utils/errorHandler.js";

export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (!(err instanceof ErrorHandler)) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || []
  });
};