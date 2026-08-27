import { nanoid } from 'nanoid';
import {ErrorHandler} from "../utils/errorHandler.js";
import * as UrlRepository from '../repositories/url.repository.js';

export const shortenURL = async (targetURL,userId) => {
    const shortCode = nanoid(10);
    const result = await UrlRepository.createUrl({userId,shortCode,targetURL});
    return result;

};
export const getAllUrls = async(userId)=>{
    const urls = await UrlRepository.getAllUrls(userId);
    if(!urls){
        throw new ErrorHandler(404,"No urls found for the user");
    }
    return urls;
}

export const getUrlByShortCode = async (shortCode)=>{
    const url = await UrlRepository.getUrlByShortCode(shortCode);
    if(!url){
        throw new ErrorHandler(404,"URL not found");
    }
    return url;
}

export const deleteUrlById = async (id)=>{
    const deletedUrl = await UrlRepository.deleteUrlById(id);
    if(!deletedUrl){
        throw new ErrorHandler(404,"URL not found");
    }
    
    return deletedUrl;
}