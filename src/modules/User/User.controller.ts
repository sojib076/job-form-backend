import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { UserJobService } from "./User.services";

export const applyForJob = asyncHandler(async (req, res) => {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
        return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "User ID and Job ID are required",
        data: {},
        });
    }
    
    const result = await UserJobService.applyForJob(userId, jobId);
    
    if (!result) {
        return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Failed to apply for job",
        data: {},
        });
    }
    
    return sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Applied for job successfully",
        data: result,
    });
});


export const getAllApplications = asyncHandler(async (req, res) => {
    const { userId ,page , limit } = req.query;
    if (!userId) {
        return sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "User ID is required",
            data: {},
        });
    }

    const applications = await UserJobService.getAllApplications(userId as string , page as string, limit as string);
    if (!applications ) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "No applications found for this user",
            data: {},
        });
    }
    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Applications retrieved successfully",
        data: applications,
    });
});

export const getAppliedJobsByUser = asyncHandler(async (req, res) => {
    console.log('ayo git hit hard boy');
    console.log('Fetching applied jobs for userId:', req.params.userId);
    const result = await UserJobService.getAppliedJobsByUser(req);

    if (!result || result.length === 0) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: "No applied jobs found for this user",
            data: {},
        });
    }
    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Applied jobs retrieved successfully",
        data: result,
    });

})


export const UserJobController = {
    applyForJob,
    getAllApplications,
    getAppliedJobsByUser
};