/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { IJob } from "./Admin.model";
import JobModel from "./Admin.model";
import AppError from "../../error/AppError";
import { UserApplicationModel } from "../User/User.model";
import mongoose from "mongoose";


const createJob = async (payload: IJob , userId :string): Promise<IJob> => {
  const job = await JobModel.create(
    {
      ...payload,
      userId,
    }
  );
  return job;
};
export const getAllJobs = async (req: Request) => {
  const { companyName, location, contract, page = "1", limit = "10" ,userId } = req.query;
  

  const filter: any = {};

  if (companyName) {
    filter.companyName = { $regex: new RegExp(companyName as string, "i") };
  }

  if (location) {
    filter.location = { $regex: new RegExp(location as string, "i") };
  }

  if ( contract) {
    filter.contract = { $regex: new RegExp(`^${contract}$`, "i") };
  }
  if (contract === "All types") {
    delete filter.contract;
  }
  if (userId) {
    console.log("User ID:", userId);
    filter.userId = userId;
  }
  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  const jobs = await JobModel.find(filter)
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 }); 
    
  const total = await JobModel.countDocuments(filter);

  return {
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
    data: jobs,
  };
};
export const updateJob = async (req:Request) => {
  const { id } = req.params;
  const updateData = req.body;
    const updatedJob = await JobModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return new AppError(404, 'Job not found'); 
    }
    console.log("Updated Job:", updatedJob);
    return updatedJob;
};


export const deleteJob = async (userId:string) => {
const id  = userId
const session = await mongoose.startSession();
session.startTransaction();

  try {
    // Step 1: Delete the Job
    const deletedJob = await JobModel.findByIdAndDelete(id, { session });
    if (!deletedJob) {
      throw new AppError(404, "Job not found");
    }

    // Step 2: Delete related applications (0 or more — it's fine)
    await UserApplicationModel.deleteMany({ jobId: id }, { session });
    // Step 3: Commit transaction
    await session.commitTransaction();
    session.endSession();

    return deletedJob._id; // optional
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const AdminJobService = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob
 
};
