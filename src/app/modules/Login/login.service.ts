import prisma from "../../../shared/prisma";
import { TLoginUser } from "./login.interface";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const loginUser = async (payload: TLoginUser) => {
    // check-1: if email exists

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });

    // check-2: password compare

    const isPasswordMatched = await bcrypt.compare(
        payload.password,
        userData.password
    );

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password Incorrect!");
    }

    // generate access token
    const accessToken = jwtHelpers.generateToken(
        {
            id: userData.id,
            name: userData.name,
            email: userData.email,
        },
        config.jwt.jwt_secret as Secret,
        config.jwt.jwt_expires_in as string
    );

    // generate refresh token
    const refreshToken = jwtHelpers.generateToken(
        {
            id: userData.id,
            name: userData.name,
            email: userData.email,
        },
        config.jwt.jwt_refresh_token_secret as Secret,
        config.jwt.jwt_refresh_token_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};

export const LoginService = {
    loginUser,
};
