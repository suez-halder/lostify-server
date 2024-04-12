import { z } from "zod";

const profileValidationSchema = z.object({
    bio: z.string({
        required_error: "Bio is required",
    }),
    age: z.number({
        required_error: "Age is required",
    }),
});

const registerUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        email: z.string({
            required_error: "Email is required",
        }),
        password: z.string({
            required_error: "Password is required",
        }),
        profile: profileValidationSchema,
    }),
});

export const RegisterValidation = {
    registerUserValidationSchema,
};
