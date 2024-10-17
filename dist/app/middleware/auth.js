"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../error/AppError"));
const user_model_1 = require("../modules/users/user.model");
const catchAsync_1 = __importDefault(require("../utilis/catchAsync"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route');
        }
        let verfiedToken;
        try {
            verfiedToken = jsonwebtoken_1.default.verify(accessToken, config_1.default.jwt_access_secret);
        }
        catch (err) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'UNAUTHORIZED');
        }
        const { role, email } = verfiedToken;
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'User not found');
        }
        if (!requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route');
        }
        req.user = verfiedToken;
        next();
    }));
};
exports.auth = auth;
