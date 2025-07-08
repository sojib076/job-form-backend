import mongoose, { Schema } from "mongoose";

export interface IJob {
  companyName: string;
  position: string;
  contract: "Full Time" | "Part Time";
  location: string;
  description?: string;
  createdAt?: Date;
}

const jobSchema: Schema<IJob> = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    enum: ["Full Time", "Part Time"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IJob>("JobModel", jobSchema);
