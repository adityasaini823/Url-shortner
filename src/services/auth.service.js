import {
    findUserByEmail,
    createUser
} from "../repositories/user.repository.js";

import {
    hashPassword,
    comparePassword
} from "../utils/password.js";

import { generateToken } from "../utils/jwt.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const signup = async ({
    firstName,
    lastName,
    email,
    password
}) => {
    
    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
        throw new ErrorHandler(400, "Email already exists");
    }
    const { hashedPassword, salt } = await hashPassword(password);
    // console.log("body data", firstName, lastName, email, hashedPassword, salt)
    const user = await createUser({
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword
    });

    const token = generateToken(
        user.id,
        user.email
    );

    return {
        user,
        token
    };
};


export const login = async ({
    email,
    password
}) => {

    const users = await findUserByEmail(email);

    if (users.length === 0) {
      throw new ErrorHandler(400, "Incorrect Email or Password");
    }

    const user = users[0];
    console.log("user", user)
    const isPasswordValid = await comparePassword(
        password,
        user.password,
        user.salt
    );

    if (!isPasswordValid) {
        throw new ErrorHandler(400, "Incorrect Email or Password");
    }

    const token = generateToken(
        user.id,
        user.email
    );

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        token
    };
};