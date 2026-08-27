import * as z from "zod";

//url schema validations
export const urlSchema = z.object({
    url:z.url("Invalid URL")
});
export const shortCodeSchema =z.object({
    shortcode: z.string().min(1,"short code is required")
});
export const deleteUrlSchema = z.object({
     id: z.uuid("Invalid URL ID")
})