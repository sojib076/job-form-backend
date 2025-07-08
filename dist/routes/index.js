"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_route_1 = require("../modules/Auth/Auth.route");
const Admin_route_1 = require("../modules/Admin/Admin.route");
const User_routes_1 = require("../modules/User/User.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: Auth_route_1.AuthRoute,
    },
    {
        path: '/jobs',
        route: Admin_route_1.AdminRoute
    },
    {
        path: '/user',
        route: User_routes_1.UserAppRoute
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
