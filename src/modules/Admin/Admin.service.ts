import { IJob } from "./Admin.model";
import JobModel from "./Admin.model";


const createJob = async (payload: IJob): Promise<IJob> => {
  const job = await JobModel.create(payload);
  return job;
};

export const AdminJobService = {
  createJob,
};
