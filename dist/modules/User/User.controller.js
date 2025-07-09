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
exports.UserJobController = exports.getAppliedJobsByUser = exports.getAllApplications = exports.applyForJob = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const User_services_1 = require("./User.services");
exports.applyForJob = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, jobId } = req.body;
    if (!userId || !jobId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "User ID and Job ID are required",
            data: {},
        });
    }
    const result = yield User_services_1.UserJobService.applyForJob(userId, jobId);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Failed to apply for job",
            data: {},
        });
    }
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Applied for job successfully",
        data: result,
    });
}));
exports.getAllApplications = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, page, limit } = req.query;
    if (!userId) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "User ID is required",
            data: {},
        });
    }
    const applications = yield User_services_1.UserJobService.getAllApplications(userId, page, limit);
    if (!applications) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "No applications found for this user",
            data: {},
        });
    }
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Applications retrieved successfully",
        data: applications,
    });
}));
exports.getAppliedJobsByUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ayo git hit hard boy');
    console.log('Fetching applied jobs for userId:', req.params.userId);
    const result = yield User_services_1.UserJobService.getAppliedJobsByUser(req);
    if (!result || result.length === 0) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "No applied jobs found for this user",
            data: {},
        });
    }
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Applied jobs retrieved successfully",
        data: result,
    });
}));
exports.UserJobController = {
    applyForJob: exports.applyForJob,
    getAllApplications: exports.getAllApplications,
    getAppliedJobsByUser: exports.getAppliedJobsByUser
};
