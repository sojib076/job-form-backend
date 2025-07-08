import mongoose, { Schema } from "mongoose";
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

