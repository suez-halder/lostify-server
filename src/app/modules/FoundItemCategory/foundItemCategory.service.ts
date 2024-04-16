import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const createFoundItemCategoryIntoDB = async (payload: { name: string }) => {
    const isItemCategoryExists = await prisma.foundItemCategory.findFirst({
        where: {
            name: payload.name,
        },
    });

    if (isItemCategoryExists) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "This item category already exists!"
        );
    }

    const result = await prisma.foundItemCategory.create({
        data: payload,
    });
    return result;
};

export const FoundItemCategoryService = {
    createFoundItemCategoryIntoDB,
};
