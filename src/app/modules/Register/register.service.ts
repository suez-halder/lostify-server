import config from "../../../config";
import { TUserRegistration } from "./register.interface";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const registerUser = async (payload: TUserRegistration) => {
    const hashedPassword = await bcrypt.hash(
        payload.password,
        Number(config.salt_rounds)
    );

    const userData = {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
    };

    const result = await prisma.user.create({
        data: userData,
    });
    return {
        id: result.id,
        name: result.name,
        email: result.email,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
    };
};

export const RegisterService = {
    registerUser,
};
