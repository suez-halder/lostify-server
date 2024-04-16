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
exports.LoginService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check-1: if email exists
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    // check-2: password compare
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password Incorrect!");
    }
    // generate access token
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expires_in);
    // generate refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
    }, config_1.default.jwt.jwt_refresh_token_secret, config_1.default.jwt.jwt_refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.LoginService = {
    loginUser,
};
