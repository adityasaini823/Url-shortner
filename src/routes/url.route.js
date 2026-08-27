import express from "express";
const router = express.Router();
import {validate} from "../middlewares/validate.middleware.js";
import * as UrlValidation from "../validations/url.validation.js";
import * as UrlController from "../controllers/url.controller.js";
import {tokenAuthentication} from "../middlewares/tokenAuthentication.middleware.js";
//authicated routes
router.post("/shorten",validate(UrlValidation.urlSchema),tokenAuthentication,UrlController.urlShorten);
router.get("/urls",tokenAuthentication,UrlController.getAllUrls);
router.delete("/url/:id",validate(UrlValidation.deleteUrlSchema),tokenAuthentication,UrlController.deleteUrlById);

//static routes
router.get("/:shortcode",validate(UrlValidation.shortCodeSchema),UrlController.getUrlByShortCode);

export default router;