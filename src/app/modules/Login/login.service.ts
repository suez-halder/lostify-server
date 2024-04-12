import prisma from "../../../shared/prisma";
import { TLoginUser } from "./login.interface";
import bcrypt from "bcrypt";

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

    // generate token
};

export const LoginService = {
    loginUser,
};
