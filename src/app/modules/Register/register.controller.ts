import { Request, Response } from "express";
import { RegisterService } from "./register.service";

const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await RegisterService.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            error: err,
        });
    }
};

export const RegisterController = {
    registerUser,
};
