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
exports.AdminJobService = exports.updateJob = exports.getAllJobs = void 0;
const Admin_model_1 = __importDefault(require("./Admin.model"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const createJob = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield Admin_model_1.default.create(payload);
    return job;
});
const getAllJobs = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, location, contract, page = "1", limit = "10" } = req.query;
    const filter = {};
    if (companyName) {
        filter.companyName = { $regex: new RegExp(companyName, "i") };
    }
    if (location) {
        filter.location = { $regex: new RegExp(location, "i") };
    }
    if (contract) {
        filter.contract = { $regex: new RegExp(`^${contract}$`, "i") };
    }
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;
    const jobs = yield Admin_model_1.default.find(filter)
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 }); // Optional: newest first
    const total = yield Admin_model_1.default.countDocuments(filter);
    return {
        meta: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
        },
        data: jobs,
    };
});
exports.getAllJobs = getAllJobs;
const updateJob = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const updatedJob = yield Admin_model_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!updatedJob) {
        return new AppError_1.default(404, 'Job not found');
    }
    return exports.updateJob;
});
exports.updateJob = updateJob;
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedJob = yield Admin_model_1.default.findByIdAndDelete(id);
    if (!deletedJob) {
        return new AppError_1.default(404, 'Job not found');
    }
    return deletedJob;
});
exports.AdminJobService = {
    createJob,
    getAllJobs: exports.getAllJobs,
    updateJob: exports.updateJob,
    deleteJob
};
