
import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { AdminJobService } from "./Admin.service";
import { Request } from "express";

export const postJob = asyncHandler(async (req, res) => {
  
  const { user } = req;
  const userId = user?._id;
const result = await AdminJobService.createJob(req.body ,userId );
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Failed to create job",
      data: {},
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Job posted successfully",
    data: result,
  });
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const result = await AdminJobService.getAllJobs(req as Request);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No jobs found",
      data: {},
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Jobs fetched successfully",
    data: result,
  });
});

const updateJob = asyncHandler(async (req, res) => {


  const updatedJob = await AdminJobService.updateJob(req as Request);

  if (!updatedJob) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Job not found",
      data: {},
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Job updated successfully",
    data: updatedJob,
  });
});


const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedJob = await AdminJobService.deleteJob(id);

  if (!deletedJob) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Job not found",
      data: {},
    });
  }

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Job deleted successfully",
    data: deletedJob,
  });
})

export const AdminJobController = {
  postJob,
    getAllJobs,
  updateJob,
  deleteJob

};
