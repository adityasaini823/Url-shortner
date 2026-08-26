import { ErrorHandler } from "../utils/errorHandler.js";
import { verifyToken } from "../utils/jwt.js";
export const tokenAuthentication = (req, res, next) => {
  try {
    const header = req?.headers?.authorization;
    if (!header || !header.startsWith("Bearer")) {
      throw new ErrorHandler(400, "Token should start with Bearer");
    }
    const [, token] = header.split(" ");
    if (!token) {
      throw new ErrorHandler(401, "no token provided");
    }
    const userId = verifyToken(token);
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
