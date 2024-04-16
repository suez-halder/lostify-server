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
exports.FoundItemCategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createFoundItemCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isItemCategoryExists = yield prisma_1.default.foundItemCategory.findFirst({
        where: {
            name: payload.name,
        },
    });
    if (isItemCategoryExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This item category already exists!");
    }
    const result = yield prisma_1.default.foundItemCategory.create({
        data: payload,
    });
    return result;
});
exports.FoundItemCategoryService = {
    createFoundItemCategoryIntoDB,
};
