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
exports.AuthServices = exports.signupUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Auth_utils_1 = require("./Auth.utils");
const User_model_1 = __importDefault(require("../User/User.model"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.default.findOne({ email: payload.email });
    if (user === null || user === void 0 ? void 0 : user.isBlocked) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is blocked , Please contact admin');
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    else {
        if (!payload.password) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Password is required');
        }
        if (payload.password) {
            const isPasswordMatched = yield bcryptjs_1.default.compare(payload.password, user.password);
            if (!isPasswordMatched) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Password Incorrect!');
            }
            const jwtPayload = {
                name: user.name,
                email: user.email,
                role: user.role,
                _id: user._id,
            };
            const accessToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
            const refreshToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
            return {
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    _id: user._id,
                },
                accessToken,
                refreshToken,
            };
        }
    }
});
const signupUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = payload;
    const existingUser = yield User_model_1.default.findOne({ email });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Email already registered");
    }
    // role based on email domain
    const adminDomain = "@arnifi.com";
    const isAdmin = payload.email.toLowerCase().endsWith(adminDomain);
    const role = isAdmin ? "admin" : "user";
    // hash password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // create new user
    const newUser = yield User_model_1.default.create({
        name,
        email,
        password: hashedPassword,
        role,
    });
    // prepare JWT payload
    const jwtPayload = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        _id: newUser._id,
    };
    // generate tokens
    const accessToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        user: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            _id: newUser._id,
        },
        accessToken,
        refreshToken,
    };
});
exports.signupUser = signupUser;
exports.AuthServices = {
    loginUser,
    signupUser: exports.signupUser,
};
