import * as authService from "../services/auth.service.js";

export const signup = async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        const result = await authService.signup({
            firstName,
            lastName,
            email,
            password
        });

        return res.status(201).json({
            message: "User created successfully",
            ...result
        });

    } catch (error) {

        console.error(error);

        return res.status(400).json({
            message: error.message
        });
    }
};


export const login = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Incorrect Email or Password"
        });
    }

    try {

        const result = await authService.login({
            email,
            password
        });

        return res.status(200).json({
            message: "Login successful",
            ...result
        });

    } catch (error) {

        console.error(error);

        return res.status(400).json({
            message: error.message
        });
    }
};