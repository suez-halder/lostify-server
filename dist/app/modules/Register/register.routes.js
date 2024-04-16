"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const register_controller_1 = require("./register.controller");
const register_validation_1 = require("./register.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(register_validation_1.RegisterValidation.registerUserValidationSchema), register_controller_1.RegisterController.registerUser);
exports.RegisterRoutes = router;
