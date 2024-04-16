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
exports.MyProfileService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getMyProfileFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userProfile.findUniqueOrThrow({
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
});
const updateMyProfileIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUserProfile = yield prisma_1.default.userProfile.update({
        where: {
            userId: user.id,
        },
        data: payload,
    });
    const result = yield prisma_1.default.userProfile.findFirst({
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
});
exports.MyProfileService = {
    getMyProfileFromDB,
    updateMyProfileIntoDB,
};
