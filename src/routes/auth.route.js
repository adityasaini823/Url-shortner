import express from "express";
const router = express.Router();
import { login, signup } from "../controllers/auth.controller.js";
import {signupSchema,loginSchema} from "../validations/auth.validation.js";
import {validate} from "../middlewares/validate.middleware.js";
//routes
router.post("/login",validate(loginSchema),login);
router.post("/signup",validate(signupSchema),signup);


export default router;