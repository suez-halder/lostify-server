import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/Register/register.interface";

const auth = (...roles: TUserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            console.log(token);
        } catch (err) {
            next(err);
        }
    };
};

export default auth;
