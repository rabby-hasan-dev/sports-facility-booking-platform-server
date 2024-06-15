"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_zodValidation_1 = require("../users/user.zodValidation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_zodValidation_1.UserSchemaValidation), auth_controller_1.authControllers.signup);
router.post('/login', auth_controller_1.authControllers.login);
exports.authRouter = router;
