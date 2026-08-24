import crypto from "crypto";
export const hashPassword = async (password, salt) => {
     salt = salt??crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
        .createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return { hashedPassword, salt };
};
export const comparePassword = async (password, hashedPassword, salt) => {
    // console.log("password", password, "hashedPassword", hashedPassword, "salt", salt)
    const { hashedPassword: newHashedPassword } = await hashPassword(password, salt);
    return newHashedPassword === hashedPassword;
}