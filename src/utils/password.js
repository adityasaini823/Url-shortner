import crypto from "crypto";
export const hashPassword = async (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
        .createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return { hashedPassword, salt };
};
export const comparePassword = async (password, hashedPassword, salt) => {
    const { hashedPassword: newHashedPassword } = await hashPassword(password, salt);
    return newHashedPassword === hashedPassword;
}