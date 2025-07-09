import mongoose, { Schema } from "mongoose";

export interface IJob {
  companyName: string;
  position: string;
  userId?: Schema.Types.ObjectId;
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
  userId: {
    type: Schema.Types.ObjectId,
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
