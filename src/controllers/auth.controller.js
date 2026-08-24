import * as authService from "../services/auth.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { ErrorHandler } from "../utils/errorHandler.js";
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  try {
    const result = await authService.signup({
      firstName,
      lastName,
      email,
      password,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, result, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Email and password are required"));
  }

  try {
    const result = await authService.login({
      email,
      password,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, result, "User logged in successfully"));
  } catch (error) {
    next(error);
  }
};
