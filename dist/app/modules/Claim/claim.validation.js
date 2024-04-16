"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimValidation = void 0;
const zod_1 = require("zod");
const createClaimValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        distinguishingFeatures: zod_1.z.string({
            required_error: "Distinguishing feature is required",
        }),
        lostDate: zod_1.z.string({
            required_error: "Lost date is required",
        }),
    }),
});
const updateClaimValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string({
            required_error: "Status is required",
        }),
    }),
});
exports.ClaimValidation = {
    createClaimValidationSchema,
    updateClaimValidationSchema,
};
