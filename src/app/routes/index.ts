import express from "express";
import { FoundItemRoutes } from "../modules/FoundItem/foundItem.routes";
import { FoundItemCategoryRoutes } from "../modules/FoundItemCategory/foundItemCategory.routes";
import { LoginRoutes } from "../modules/Login/login.routes";
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
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
