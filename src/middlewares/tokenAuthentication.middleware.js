import { ErrorHandler } from "../utils/errorHandler.js";
import { verifyToken } from "../utils/jwt.js";
export const tokenAuthentication = (req, res, next) => {
  try {
    const header = req?.headers?.authorization;
    if (!header || !header.startsWith("Bearer")) {
      return next(new ErrorHandler(401, "Token is required"));
    }
    const [, token] = header.split(" ");
    if (!token) {
      return next(new ErrorHandler(401, "No token provided"));
    }
    req.user = verifyToken(token);
    next();
  } catch (err) {
    // console.log(err);
    next(err);
  }
};
