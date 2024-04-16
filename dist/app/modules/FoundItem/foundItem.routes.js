"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const register_constant_1 = require("../Register/register.constant");
const foundItem_controller_1 = require("./foundItem.controller");
const foundItem_validation_1 = require("./foundItem.validation");
const router = express_1.default.Router();
router.get("/", foundItem_controller_1.FoundItemController.getAllFoundItemsFromDB);
router.post("/", (0, auth_1.default)(register_constant_1.UserRole.USER), (0, validateRequest_1.default)(foundItem_validation_1.FoundItemValidation.createFoundItemValidationSchema), foundItem_controller_1.FoundItemController.createFoundItemIntoDB);
exports.FoundItemRoutes = router;
