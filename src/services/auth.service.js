import {
    findUserByEmail,
    createUser
} from "../repositories/user.repository.js";

import {
    hashPassword,
    comparePassword
} from "../utils/password.js";

import { generateToken } from "../utils/jwt.js";


export const signup = async ({
    firstName,
    lastName,
    email,
    password
}) => {

    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
        firstName,
        lastName,
        email,
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
        throw new Error("Incorrect Email or Password");
    }

    const user = users[0];

    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Incorrect Email or Password");
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