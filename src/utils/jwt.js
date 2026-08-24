import jwt from "jsonwebtoken";
export const generateToken =  (userId, userEmail) => {
    return jwt.sign(
        {
            userId: userId,
            userEmail: userEmail
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );
}