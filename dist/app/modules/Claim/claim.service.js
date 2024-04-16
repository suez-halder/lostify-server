"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createClaimIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    //check-1: if the found item exists
    const foundItemData = yield prisma_1.default.foundItem.findUniqueOrThrow({
        where: {
            id: payload.foundItemId,
        },
    });
    // check-2: if the lostDate > foundDate
    const lostDate = new Date(payload.lostDate);
    const foundDate = foundItemData.createdAt;
    if (lostDate > foundDate) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Unable to proceed with claiming the item as it appears to have been reported lost after the date it was found.");
    }
    // check-3: same user, same found item, barbar claim korte parbena
    const isAlreadyClaimed = yield prisma_1.default.claim.findFirst({
        where: {
            userId: user.id,
            foundItemId: foundItemData.id,
            status: client_1.Status.PENDING,
        },
    });
    if (isAlreadyClaimed) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This item has already been claimed!");
    }
    const result = yield prisma_1.default.claim.create({
        data: Object.assign(Object.assign({}, payload), { userId: user.id }),
    });
    return result;
});
const getMyClaims = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.claim.findMany({
        where: {
            userId: user.id,
            status: client_1.Status.PENDING,
        },
    });
    return result;
});
const updateClaimStatus = (payload, id, user) => __awaiter(void 0, void 0, void 0, function* () {
    //check : claim id valid kina. je claimed item approve/reject hobe, seta je user found korse, only she e status update korte parbe
    const claimData = yield prisma_1.default.claim.findUniqueOrThrow({
        where: {
            id,
            status: client_1.Status.PENDING,
            foundItem: {
                user: {
                    id: user.id,
                },
            },
        },
    });
    const result = yield prisma_1.default.claim.update({
        where: {
            id: claimData.id,
        },
        data: payload,
    });
    return result;
});
exports.ClaimService = {
    createClaimIntoDB,
    getMyClaims,
    updateClaimStatus,
};
