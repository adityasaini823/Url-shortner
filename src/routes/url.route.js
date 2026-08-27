import express from "express";
const router = express.Router();
import {validate} from "../middlewares/validate.middleware.js";
import {urlSchema} from "../validations/url.validation.js";
import * as UrlController from "../controllers/url.controller.js";
import {tokenAuthentication} from "../middlewares/tokenAuthentication.middleware.js";
//routes
router.post("/shorten",validate(urlSchema),tokenAuthentication,UrlController.urlShorten);
router.get("/:shortcode",UrlController.getUrlByShortCode);
router.get("/urls",tokenAuthentication,UrlController.getAllUrls);
router.delete("/url/:id",tokenAuthentication,UrlController.deleteUrlById);

export default router;