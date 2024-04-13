import { Status } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TAuthUser } from "../../interfaces/common";
import { TClaim } from "./claim.interface";

const createClaimIntoDB = async (payload: TClaim, user: TAuthUser) => {
    //check-1: if the found item exists
    const foundItemData = await prisma.foundItem.findUniqueOrThrow({
        where: {
            id: payload.foundItemId,
        },
    });

    // check-2: if the lostDate > foundDate

    const lostDate = new Date(payload.lostDate);
    const foundDate = foundItemData.createdAt;

    if (lostDate > foundDate) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Unable to proceed with claiming the item as it appears to have been reported lost after the date it was found."
        );
    }

    // TODO: check-3: same user, same found item, barbar claim korte parbena
    const isAlreadyClaimed = await prisma.claim.findFirst({
        where: {
            userId: user.id,
            foundItemId: foundItemData.id,
            status: Status.PENDING,
        },
    });

    if (isAlreadyClaimed) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "This item has already been claimed!"
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

const updateClaimStatus = async (
    payload: { status: Status },
    id: string,
    user: TAuthUser
) => {
    //check : claim id valid kina. je claimed item approve/reject hobe, seta je user found korse, only she e status update korte parbe

    const claimData = await prisma.claim.findUniqueOrThrow({
        where: {
            id,
            status: Status.PENDING,
            foundItem: {
                user: {
                    id: user.id,
                },
            },
        },
    });

    const result = await prisma.claim.update({
        where: {
            id: claimData.id,
        },
        data: payload,
    });

    return result;
};

export const ClaimService = {
    createClaimIntoDB,
    getMyClaims,
    updateClaimStatus,
};
