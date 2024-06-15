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
exports.AuthServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_constant_1 = require("../users/user.constant");
const user_model_1 = require("../users/user.model");
const auth_utils_1 = require("./auth.utils");
//  CHECK EXISTS USER AND SAVE NEW USER DATA INTO DATABASE
const signupDataIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //user existence check
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new Error('User already exists');
    }
    //set user role
    payload.role = user_constant_1.USER_Role.user;
    //create user
    const newUser = yield user_model_1.User.create(payload);
    return newUser;
});
// CHECK EXISTS USER DATA AND FIND
const loginUserDataIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }
    const passwordMatch = yield (0, auth_utils_1.isPasswordMatched)(payload.password, user.password);
    if (!passwordMatch) {
        throw new Error('Password not matched');
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires_in,
    });
    return {
        accessToken,
        refreshToken,
    };
});
exports.AuthServices = {
    signupDataIntoDB,
    loginUserDataIntoDB,
};
