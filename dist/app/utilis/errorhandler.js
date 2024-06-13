"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.all('/', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route not found',
    });
});
exports.notFoundRouter = router;
