import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TAuthUser } from "../../interfaces/common";
import { TFoundItem } from "./foundItem.interface";

const createFoundItemIntoDB = async (payload: TFoundItem, user: TAuthUser) => {
    const categoryData = await prisma.foundItemCategory.findUniqueOrThrow({
        where: {
            id: payload.categoryId,
        },
    });

    if (!categoryData) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Category does not exists!");
    }

    const result = await prisma.foundItem.create({
        data: {
            ...payload,
            userId: user.id,
        },
        include: {
            user: true,
            category: true,
        },
    });

    return result;
};

const getAllFoundItemsFromDB = async () => {
    const result = await prisma.foundItem.findMany();
    return result;
};

export const FoundItemService = {
    createFoundItemIntoDB,
    getAllFoundItemsFromDB,
};
