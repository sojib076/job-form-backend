import { Request } from "express";
import { UserApplicationModel } from "./User.model";

export const applyForJob = async (userId: string, jobId: string) => {

  const existing = await UserApplicationModel.findOne({ userId, jobId });

  if (existing) {
    throw new Error("Already applied for this job.");
  }



  const application = await UserApplicationModel.create({
    userId,
    jobId,
    appliedAt: new Date(),
  });

  return application;
};
export const getAllApplications = async (userId: string, page:string, limit:string) => {
  console.log("Fetching applications for user:", userId , page, limit);
    const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 3) || 3;
  const skip = (pageNum - 1) * limitNum;
  const [applications, total] = await Promise.all([
    UserApplicationModel.find({ userId })
      .populate("jobId", "position companyName location")
      .skip(skip)
      .limit(limitNum),
    UserApplicationModel.countDocuments({ userId }),
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
};


export const getAppliedJobsByUser = async (req :Request, ) => {

  const { userId } = req.params;
 
  if (!userId) {
    throw new Error("User ID is required");
  }
 

  const applications = await UserApplicationModel.find({ userId })
 
  const appliedJobIds = applications.map((app) => app.jobId);
  return appliedJobIds;

};
export const UserJobService = {
  applyForJob,
  getAllApplications,
  getAppliedJobsByUser

};