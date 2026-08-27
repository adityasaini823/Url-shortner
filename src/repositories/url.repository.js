import {db} from "../db/index.js";
import {urlTable} from "../db/schema/urls.js";

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