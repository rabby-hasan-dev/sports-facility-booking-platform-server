"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
//  parser
app.use(express_1.default.json());
// middleware
app.use((0, cors_1.default)());
//  APPLICATION ROUTEs
app.use('/api', routes_1.default);
// Default Home Routes
app.get('/', (req, res) => {
    res.send('SPORTS FACILITY BOOKING PLATFORM SERVER!');
});
//  GLOBAL ERROR HANDLER
app.use(globalErrorHandler_1.default);
// NOT FOUND ROUTE
app.use(notFound_1.default);
exports.default = app;
