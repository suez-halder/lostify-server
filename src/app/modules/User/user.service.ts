import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../../config";
import { TUser } from "./user.interface";

const prisma = new PrismaClient();

const createUser = async (payload: TUser) => {
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

export const UserService = {
    createUser,
};
