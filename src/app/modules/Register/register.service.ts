import config from "../../../config";
import { TUserRegistration } from "./register.interface";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const registerUser = async (payload: TUserRegistration) => {
    const hashedPassword = await bcrypt.hash(
        payload.password,
        Number(config.salt_rounds)
    );

    const userData = await prisma.$transaction(async (tx) => {
        const createUser = await tx.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
            },
        });

        await tx.userProfile.create({
            data: {
                userId: createUser.id,
                ...payload.profile,
            },
        });

        return createUser;
    });

    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id: userData.id,
        },
        include: {
            profile: true,
        },
    });

    const { password, ...userWithoutPassword } = result;

    return userWithoutPassword;
};

export const RegisterService = {
    registerUser,
};
