
import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { AdminJobService } from "./Admin.service";

export const postJob = asyncHandler(async (req, res) => {
  const result = await AdminJobService.createJob(req.body);

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



export const AdminJobController = {
  postJob,
};
