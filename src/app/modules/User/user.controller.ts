import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User created successfully!",
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

export const UserController = {
    createUser,
};
