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
exports.AdminJobService = exports.deleteJob = exports.updateJob = exports.getAllJobs = void 0;
const Admin_model_1 = __importDefault(require("./Admin.model"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const User_model_1 = require("../User/User.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createJob = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield Admin_model_1.default.create(Object.assign(Object.assign({}, payload), { userId }));
    return job;
});
const getAllJobs = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, location, contract, page = "1", limit = "10", userId } = req.query;
    console.log("Query Parameters:", req.query);
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
    if (contract === "All types") {
        delete filter.contract;
    }
    if (userId) {
        console.log("User ID:", userId);
        filter.userId = userId;
    }
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;
    const jobs = yield Admin_model_1.default.find(filter)
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 });
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
const deleteJob = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userId;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Step 1: Delete the Job
        const deletedJob = yield Admin_model_1.default.findByIdAndDelete(id, { session });
        if (!deletedJob) {
            throw new AppError_1.default(404, "Job not found");
        }
        // Step 2: Delete related applications (0 or more — it's fine)
        yield User_model_1.UserApplicationModel.deleteMany({ jobId: id }, { session });
        // Step 3: Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return deletedJob._id; // optional
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.deleteJob = deleteJob;
exports.AdminJobService = {
    createJob,
    getAllJobs: exports.getAllJobs,
    updateJob: exports.updateJob,
    deleteJob: exports.deleteJob
};
