import express from "express";
import { ClaimRoutes } from "../modules/Claim/claim.routes";
import { FoundItemRoutes } from "../modules/FoundItem/foundItem.routes";
import { FoundItemCategoryRoutes } from "../modules/FoundItemCategory/foundItemCategory.routes";
import { LoginRoutes } from "../modules/Login/login.routes";
import { MyProfileRoutes } from "../modules/MyProfile/myProfile.routes";
import { RegisterRoutes } from "../modules/Register/register.routes";

const routes = express.Router();

const moduleRoutes = [
    {
        path: "/register",
        route: RegisterRoutes,
    },
    {
        path: "/login",
        route: LoginRoutes,
    },
    {
        path: "/found-item-categories",
        route: FoundItemCategoryRoutes,
    },
    {
        path: "/found-items",
        route: FoundItemRoutes,
    },
    {
        path: "/claims",
        route: ClaimRoutes,
    },
    {
        path: "/my-profile",
        route: MyProfileRoutes,
    },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
