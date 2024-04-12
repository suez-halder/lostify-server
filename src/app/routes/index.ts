import express from "express";
import { RegisterRoutes } from "../modules/Register/register.routes";

const routes = express.Router();

const moduleRoutes = [
    {
        path: "/register",
        route: RegisterRoutes,
    },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
