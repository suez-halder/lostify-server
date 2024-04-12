import prisma from "../../../shared/prisma";
import { TLoginUser } from "./login.interface";

const loginUser = async (payload: TLoginUser) => {
    // check-1: if email exists
    // check-2: password compare for the email holding user

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });

    console.log(userData);
};

export const LoginService = {
    loginUser,
};
