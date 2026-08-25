import { ErrorHandler } from "../utils/errorHandler.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return next(
                new ErrorHandler(
                    400,
                    "validation failed",
                    result.error.flatten().fieldErrors,
                )
            );
        }

        req.body = result.data;

        next();
    };
};