import express from "express";
const router = express.Router();
import {validate} from "../middlewares/validate.middleware.js";
import {urlSchema} from "../validations/url.validation.js";
import {urlShorten} from "../controllers/url.controller.js";
import {tokenAuthentication} from "../middlewares/tokenAuthentication.middleware.js";
//routes
router.post("/shorten",validate(urlSchema),tokenAuthentication,urlShorten);


export default router;