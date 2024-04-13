import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    salt_rounds: process.env.SALT_ROUNDS,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expires_in: process.env.JWT_EXPIRES_IN,
        jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
};
