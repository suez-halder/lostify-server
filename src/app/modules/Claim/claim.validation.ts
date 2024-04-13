import { z } from "zod";

const createClaimValidationSchema = z.object({
    body: z.object({
        distinguishingFeatures: z.string({
            required_error: "Distinguishing feature is required",
        }),
        lostDate: z.string({
            required_error: "Lost date is required",
        }),
    }),
});
const updateClaimValidationSchema = z.object({
    body: z.object({
        status: z.string({
            required_error: "Status is required",
        }),
    }),
});

export const ClaimValidation = {
    createClaimValidationSchema,
    updateClaimValidationSchema,
};
