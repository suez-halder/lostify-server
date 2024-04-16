"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const claim_routes_1 = require("../modules/Claim/claim.routes");
const foundItem_routes_1 = require("../modules/FoundItem/foundItem.routes");
const foundItemCategory_routes_1 = require("../modules/FoundItemCategory/foundItemCategory.routes");
const login_routes_1 = require("../modules/Login/login.routes");
const myProfile_routes_1 = require("../modules/MyProfile/myProfile.routes");
const register_routes_1 = require("../modules/Register/register.routes");
const routes = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/register",
        route: register_routes_1.RegisterRoutes,
    },
    {
        path: "/login",
        route: login_routes_1.LoginRoutes,
    },
    {
        path: "/found-item-categories",
        route: foundItemCategory_routes_1.FoundItemCategoryRoutes,
    },
    {
        path: "/found-items",
        route: foundItem_routes_1.FoundItemRoutes,
    },
    {
        path: "/claims",
        route: claim_routes_1.ClaimRoutes,
    },
    {
        path: "/my-profile",
        route: myProfile_routes_1.MyProfileRoutes,
    },
];
moduleRoutes.forEach((route) => routes.use(route.path, route.route));
exports.default = routes;
