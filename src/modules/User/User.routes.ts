
import express from "express";
import { UserJobController } from "./User.controller";



const router = express.Router();


router.post("/apply",UserJobController.applyForJob);
router.get("/applications", UserJobController.getAllApplications);
router.get("/applied-jobs/:userId", UserJobController.getAppliedJobsByUser);


export const UserAppRoute = router;
