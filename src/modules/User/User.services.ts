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
export const getAllApplications = async (userId:string) => {

const applications = await UserApplicationModel.find({ userId })
      .populate("jobId", "position companyName location");
  if (!applications || applications.length === 0) {
    throw new Error("No applications found for this user.");
  }
  return applications;
}

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