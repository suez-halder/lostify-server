import { Status } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TAuthUser } from "../../interfaces/common";
import { TClaim } from "./claim.interface";

const createClaimIntoDB = async (payload: TClaim, user: TAuthUser) => {
    const foundItemData = await prisma.foundItem.findUniqueOrThrow({
        where: {
            id: payload.foundItemId,
        },
    });

    console.log(foundItemData);

    //check-1: if the found item exists

    if (!foundItemData) {
        throw new ApiError(httpStatus.BAD_REQUEST, "No item found!");
    }

    // check-2: if the lostDate > foundDate

    const lostDate = new Date(payload.lostDate);
    const foundDate = foundItemData.createdAt;

    if (lostDate > foundDate) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Unable to proceed with claiming the item as it appears to have been reported lost after the date it was found."
        );
    }

    const result = await prisma.claim.create({
        data: {
            ...payload,
            userId: user.id,
        },
    });

    return result;
};

const getMyClaims = async (user: TAuthUser) => {
    const result = await prisma.claim.findMany({
        where: {
            userId: user.id,
            status: Status.PENDING,
        },
    });

    return result;
};

export const ClaimService = {
    createClaimIntoDB,
    getMyClaims,
};
