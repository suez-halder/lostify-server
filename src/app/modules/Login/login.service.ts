import { TLoginUser } from "./login.interface";

const loginUser = async (payload: TLoginUser) => {
    console.log("user logged in");
};

export const LoginService = {
    loginUser,
};
