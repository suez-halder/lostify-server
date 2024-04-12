import express from "express";
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
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
