"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingCheckerRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookingChecker_controller_1 = require("./bookingChecker.controller");
const router = express_1.default.Router();
router.get('/', bookingChecker_controller_1.bookingCheckerController.bookingChecker);
exports.bookingCheckerRouter = router;
