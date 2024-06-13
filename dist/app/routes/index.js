"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/users/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRouter,
    },
];
moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));
exports.default = router;
