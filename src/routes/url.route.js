import express from "express";
const router = express.Router();
import {validate} from "../middlewares/validate.middleware.js";
import * as UrlValidation from "../validations/url.validation.js";
import * as UrlController from "../controllers/url.controller.js";
import {tokenAuthentication} from "../middlewares/tokenAuthentication.middleware.js";
//authicated routes
router.post("/shorten",validate(UrlValidation.urlSchema),tokenAuthentication,UrlController.urlShorten);

//static routes
router.get("/",tokenAuthentication,UrlController.getAllUrls);
router.delete("/:id",tokenAuthentication,UrlController.deleteUrlById);
router.get("/:shortcode",UrlController.getUrlByShortCode);

export default router;