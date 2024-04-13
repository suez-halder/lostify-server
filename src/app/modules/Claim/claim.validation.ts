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

export const ClaimValidation = {
    createClaimValidationSchema,
};
