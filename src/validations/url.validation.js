import * as z from "zod";

//url schema validations
export const urlSchema = z.object({
    url:z.url("Invalid URL")
});