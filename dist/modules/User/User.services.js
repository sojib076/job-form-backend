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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJobService = exports.getAppliedJobsByUser = exports.getAllApplications = exports.applyForJob = void 0;
const User_model_1 = require("./User.model");
const applyForJob = (userId, jobId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield User_model_1.UserApplicationModel.findOne({ userId, jobId });
    if (existing) {
        throw new Error("Already applied for this job.");
    }
    const application = yield User_model_1.UserApplicationModel.create({
        userId,
        jobId,
        appliedAt: new Date(),
    });
    return application;
});
exports.applyForJob = applyForJob;
const getAllApplications = (userId, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching applications for user:", userId, page, limit);
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 3) || 3;
    const skip = (pageNum - 1) * limitNum;
    const [applications, total] = yield Promise.all([
        User_model_1.UserApplicationModel.find({ userId })
            .populate("jobId", "position companyName location")
            .skip(skip)
            .limit(limitNum),
        User_model_1.UserApplicationModel.countDocuments({ userId }),
    ]);
    if (!applications || applications.length === 0) {
        throw new Error("No applications found for this user.");
    }
    return {
        applications,
        meta: {
            totalItems: total,
            itemsPerPage: limit,
            totalPages: Math.ceil(total / limitNum),
            page,
        },
    };
});
exports.getAllApplications = getAllApplications;
const getAppliedJobsByUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        throw new Error("User ID is required");
    }
    const applications = yield User_model_1.UserApplicationModel.find({ userId });
    const appliedJobIds = applications.map((app) => app.jobId);
    return appliedJobIds;
});
exports.getAppliedJobsByUser = getAppliedJobsByUser;
exports.UserJobService = {
    applyForJob: exports.applyForJob,
    getAllApplications: exports.getAllApplications,
    getAppliedJobsByUser: exports.getAppliedJobsByUser
};
