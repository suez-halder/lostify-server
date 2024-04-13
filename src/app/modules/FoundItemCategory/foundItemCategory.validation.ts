import { z } from "zod";

const createFoundItemCategoryValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
    }),
});

export const FoundItemCategoryValidation = {
    createFoundItemCategoryValidationSchema,
};
