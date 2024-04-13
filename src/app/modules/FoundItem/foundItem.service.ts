import prisma from "../../../shared/prisma";
import { TAuthUser } from "../../interfaces/common";
import { TFoundItem } from "./foundItem.interface";

const createFoundItemIntoDB = async (payload: TFoundItem, user: TAuthUser) => {
    console.log(user);

    const createFoundItem = await prisma.foundItem.create({
        data: {
            ...payload,
            userId: user.id,
        },
    });

    const result = await prisma.foundItem.findUnique({
        where: {
            id: createFoundItem.id,
        },
        include: {
            user: true,
            category: true,
        },
    });

    return result;
};

export const FoundItemService = {
    createFoundItemIntoDB,
};
