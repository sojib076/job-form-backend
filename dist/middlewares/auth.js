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
const AppError_1 = __importDefault(require("../error/AppError"));
const asyncHandler_1 = require("../utils/asyncHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...requiredRoles) => {
    return (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        console.log(token);
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        req.user = decoded;
        console.log(decoded);
        if (requiredRoles && !requiredRoles.includes(decoded.role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You have no access to this route!');
        }
        next();
    }));
};
exports.auth = auth;
