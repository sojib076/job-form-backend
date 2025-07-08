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
exports.AdminJobController = exports.getAllJobs = exports.postJob = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const Admin_service_1 = require("./Admin.service");
exports.postJob = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Admin_service_1.AdminJobService.createJob(req.body);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Failed to create job",
            data: {},
        });
    }
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Job posted successfully",
        data: result,
    });
}));
exports.getAllJobs = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authraization = req.headers.authorization;
    console.log("Authorization Header:", authraization);
    const result = yield Admin_service_1.AdminJobService.getAllJobs(req);
    console.log(result);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "No jobs found",
            data: {},
        });
    }
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Jobs fetched successfully",
        data: result,
    });
}));
const updateJob = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedJob = yield Admin_service_1.AdminJobService.updateJob(req);
    if (!updatedJob) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Job not found",
            data: {},
        });
    }
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Job updated successfully",
        data: updatedJob,
    });
}));
const deleteJob = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedJob = yield Admin_service_1.AdminJobService.deleteJob(id);
    if (!deletedJob) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Job not found",
            data: {},
        });
    }
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Job deleted successfully",
        data: deletedJob,
    });
}));
exports.AdminJobController = {
    postJob: exports.postJob,
    getAllJobs: exports.getAllJobs,
    updateJob,
    deleteJob
};
