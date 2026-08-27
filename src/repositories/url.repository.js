import {db} from "../db/index.js";
import {urlTable} from "../db/schema/urls.js";
import {eq} from "drizzle-orm";
export const createUrl = async ({userId,shortCode,targetURL})=>{
    const [result] = await db.insert(urlTable)
    .values({userId,shortCode,targetURL})
    .returning({
        shortCode:urlTable.shortCode,
        userId:urlTable.userId,
        targetURL:urlTable.targetURL
    });
    return result;
}
export const getAllUrls =async (userId)=>{
    const urls = await db.select().from(urlTable).where(eq(urlTable.userId,userId));
    console.log(urls);
    return urls;
}

export const getUrlByShortCode = async (shortCode)=>{
    const [url] = await db.select({targetURL:urlTable.targetURL}).from(urlTable).where(eq(urlTable.shortCode,shortCode));
    return url;
}

export const deleteUrlById = async (id)=>{
    const [deletedUrl] = await db.delete(urlTable)
    .where(eq(urlTable.id,id))
    .returning({id: urlTable.id});

    return deletedUrl;
}