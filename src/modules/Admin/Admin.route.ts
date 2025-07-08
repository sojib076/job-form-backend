import express from "express";
import { AdminJobController } from "./Admin.controller";


const router = express.Router();

// @route   POST /api/v1/jobs
// @desc    Admin can post a new job
// @access  Admin only (auth middleware can be added later)
router.post("/admin-post", AdminJobController.postJob);

export const AdminRoute = router;
