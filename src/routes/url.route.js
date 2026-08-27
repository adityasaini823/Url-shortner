import express from "express";
const router = express.Router();
import {validate} from "../middlewares/validate.middleware.js";
import {urlSchema} from "../validations/url.validation.js";
//routes
router.post("/shorten",validate(urlSchema),urlShorten);


export default router;