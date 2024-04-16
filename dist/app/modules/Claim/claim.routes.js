"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const register_constant_1 = require("../Register/register.constant");
const claim_controller_1 = require("./claim.controller");
const claim_validation_1 = require("./claim.validation");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(register_constant_1.UserRole.USER), claim_controller_1.ClaimController.getMyClaims);
router.post("/", (0, auth_1.default)(register_constant_1.UserRole.USER), (0, validateRequest_1.default)(claim_validation_1.ClaimValidation.createClaimValidationSchema), claim_controller_1.ClaimController.createClaimIntoDB);
router.patch("/:id", (0, auth_1.default)(register_constant_1.UserRole.USER), (0, validateRequest_1.default)(claim_validation_1.ClaimValidation.updateClaimValidationSchema), claim_controller_1.ClaimController.updateClaimStatus);
exports.ClaimRoutes = router;
