/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { IJob } from "./Admin.model";
import JobModel from "./Admin.model";
import AppError from "../../error/AppError";


const createJob = async (payload: IJob): Promise<IJob> => {
  const job = await JobModel.create(payload);
  return job;
};
export const getAllJobs = async (req: Request) => {
  const { companyName, location, contract, page = "1", limit = "10" } = req.query;

  const filter: any = {};

  if (companyName) {
    filter.companyName = { $regex: new RegExp(companyName as string, "i") };
  }

  if (location) {
    filter.location = { $regex: new RegExp(location as string, "i") };
  }

  if (contract) {
    filter.contract = { $regex: new RegExp(`^${contract}$`, "i") };
  }


  const pageNum = parseInt(page as string, 10) || 1;
  const limitNum = parseInt(limit as string, 10) || 10;
  const skip = (pageNum - 1) * limitNum;

  const jobs = await JobModel.find(filter)
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 }); // Optional: newest first
    

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
    return updateJob
};


  const deleteJob = async (id) => {
  const deletedJob = await JobModel.findByIdAndDelete(id);
  if (!deletedJob) {
    return new AppError(404, 'Job not found');
  }
    
  return deletedJob;
  }

export const AdminJobService = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob
 
};
