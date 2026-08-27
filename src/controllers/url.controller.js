import {ApiResponse}from "../utils/api-response.js";
import * as UrlService from "../services/url.service.js";
export const urlShorten = async (req,res,next)=>{
    const targetURL = req.body.url;
    const userId = req.user.userId;
    try{
        const result = await UrlService.shortenURL(targetURL,userId);
        return res.status(201).json(new ApiResponse(201,result,"URL shortened successfully"));
    }catch(err){
        next(err);
    }  
}

export const getAllUrls= async(req,res,next)=>{
    const {userId}=req.user
    const urls = await UrlService.getAllUrls(userId);
    return res.status(200).json(new ApiResponse(200,urls,"URLs fetched successfully") );
}
export const getUrlByShortCode = async (req,res,next)=>{
    const shortCode = req.params.shortcode;
    if(!shortCode){
        return next(new ErrorHandler(400,"Shortcode is required"));
    }
    const url = await UrlService.getUrlByShortCode(shortCode);
    return res.status(200).json(new ApiResponse(200,url,"URL fetched successfully"));
}

export const deleteUrlById = async (req,res,next)=>{
    const id = req.params.id;
    const userId = req.user.userId;
    if(!id){
        return next(new ErrorHandler(400,"Id is required"));
    }
    const deletedUrl = await UrlService.deleteUrlById(id,userId);
    return res.status(200).json(new ApiResponse(204,deletedUrl,"URL deleted successfully"));;
}