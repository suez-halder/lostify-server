import { UserRole } from "./register.constant";

export type TProfile = {
    bio: string;
    age: number;
};

export type TUserRegistration = {
    name: string;
    email: string;
    password: string;
    profile: TProfile;
};

export type TUserRole = keyof typeof UserRole;
