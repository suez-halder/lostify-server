import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/Register/register.interface";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const auth = (...roles: TUserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized!"
                );
            }

            const verifiedUser = jwtHelpers.verifyToken(
                token,
                config.jwt.jwt_secret as Secret
            );

            req.user = verifiedUser;

            next();
        } catch (err) {
            next(err);
        }
    };
};

export default auth;
