type TProfile = {
    bio: string;
    age: number;
};

export type TUserRegistration = {
    name: string;
    email: string;
    password: string;
    profile: TProfile;
};
