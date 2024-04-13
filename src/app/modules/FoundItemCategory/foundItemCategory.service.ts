import prisma from "../../../shared/prisma";

const createFoundItemCategoryIntoDB = async (payload: { name: string }) => {
    const result = await prisma.foundItemCategory.create({
        data: payload,
    });
    return result;
};

export const FoundItemCategoryService = {
    createFoundItemCategoryIntoDB,
};
