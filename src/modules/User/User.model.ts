import mongoose, { Document, Schema } from "mongoose";
import { Iuser } from "./User.interface";

const userSchema: Schema <Iuser> = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isBlocked: {
        type: Boolean,
        default: false
    }

})

export default mongoose.model('UserModel', userSchema);



export interface IUserFunctions extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userApplicationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobModel",
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const UserApplicationModel = mongoose.model(
  "UserApplication",
  userApplicationSchema
);
