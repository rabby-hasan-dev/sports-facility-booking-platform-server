"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const orders_route_1 = require("./app/modules/orders/orders.route");
const products_route_1 = require("./app/modules/products/products.route");
const errorhandler_1 = require("./app/utilis/errorhandler");
const app = (0, express_1.default)();
//  parser
app.use(express_1.default.json());
// middleware
app.use((0, cors_1.default)());
//  Router
app.use('/api', products_route_1.productRouter);
app.use('/api', orders_route_1.orderRouter);
app.get('/', (req, res) => {
    res.send('Hello World Programmer!');
});
app.use('*', errorhandler_1.notFoundRouter);
exports.default = app;
