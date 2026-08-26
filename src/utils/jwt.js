import jwt from "jsonwebtoken";
const  secret= process.env.JWT_SECRET
export const generateToken =  (userId, userEmail) => {
    return jwt.sign(
        {
            userId: userId,
            userEmail: userEmail
        },
        secret,
        { expiresIn: "1h" }
        );
}
export const verifyToken = (token)=>{
    const decoded = jwt.verify(token,secret);
    return decoded.userId;
}