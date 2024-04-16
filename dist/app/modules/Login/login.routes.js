"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const login_controller_1 = require("./login.controller");
const login_validation_1 = require("./login.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(login_validation_1.LoginValidation.userLoginValidationSchema), login_controller_1.LoginController.loginUser);
exports.LoginRoutes = router;
