import express from "express";
import { UserRoutes } from "../modules/User/user.routes";

const routes = express.Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes,
    },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;
