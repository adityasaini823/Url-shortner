import {ApiResponse}from "../utils/api-response.js";
import {shortenURL} from "../services/url.service.js";
export const urlShorten = async (req,res,next)=>{
    const targetURL = req.body.url;
    const userId = req.user.userId;
    try{
        const result = await shortenURL(targetURL,userId);
        return res.status(201).json(new ApiResponse(201,result,"URL shortened successfully"));
    }catch(err){
        next(err);
    }  
}