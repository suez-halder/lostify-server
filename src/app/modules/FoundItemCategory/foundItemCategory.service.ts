import prisma from "../../../shared/prisma";

const createFoundItemCategoryIntoDB = async (payload: any) => {
    console.log({ payload });
};

export const FoundItemCategoryService = {
    createFoundItemCategoryIntoDB,
};
