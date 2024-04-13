import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TAuthUser } from "../../interfaces/common";
import { TProfile } from "../Register/register.interface";

const getMyProfileFromDB = async (user: TAuthUser) => {
    const result = await prisma.userProfile.findUniqueOrThrow({
        where: {
            userId: user.id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });

    return result;
};

const updateMyProfileIntoDB = async (
    payload: Partial<TProfile>,
    user: TAuthUser
) => {
    const updatedUserProfile = await prisma.userProfile.update({
        where: {
            userId: user.id,
        },
        data: payload,
    });

    const result = await prisma.userProfile.findFirst({
        where: {
            id: updatedUserProfile.id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });

    return result;
};

export const MyProfileService = {
    getMyProfileFromDB,
    updateMyProfileIntoDB,
};
