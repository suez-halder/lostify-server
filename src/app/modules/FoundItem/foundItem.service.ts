import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TAuthUser } from "../../interfaces/common";
import { foundItemSearchableFields } from "./foundItem.constant";
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

const getAllFoundItemsFromDB = async (filters: any, options: any) => {
    const { limit, page, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, specialties, ...filterData } = filters;

    const andConditions: Prisma.FoundItemWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: foundItemSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        const filterConditions = Object.keys(filterData).map((key) => ({
            [key]: {
                equals: (filterData as any)[key],
            },
        }));
        andConditions.push(...filterConditions);
    }

    const whereConditions: Prisma.FoundItemWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.foundItem.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : { createdAt: "desc" },
        include: {
            user: true,
            category: true,
        },
    });

    const total = await prisma.foundItem.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};

export const FoundItemService = {
    createFoundItemIntoDB,
    getAllFoundItemsFromDB,
};
