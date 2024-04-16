"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const register_constant_1 = require("../Register/register.constant");
const myProfile_controller_1 = require("./myProfile.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(register_constant_1.UserRole.USER), myProfile_controller_1.MyProfileController.getMyProfileFromDB);
router.put("/", (0, auth_1.default)(register_constant_1.UserRole.USER), myProfile_controller_1.MyProfileController.updateMyProfileIntoDB);
exports.MyProfileRoutes = router;
