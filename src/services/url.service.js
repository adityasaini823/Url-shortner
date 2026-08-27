import { nanoid } from 'nanoid';
import { createUrl } from '../repositories/url.repository.js';
export const shortenURL = async (targetURL,userId) => {
    const shortCode = nanoid(10);
    const result = await createUrl({userId,shortCode,targetURL});
    return result;

};