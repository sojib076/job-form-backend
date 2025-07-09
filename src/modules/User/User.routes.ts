
import express from "express";
import { UserJobController } from "./User.controller";
import { auth } from "../../middlewares/auth";



const router = express.Router();


router.post("/apply", auth('user') , UserJobController.applyForJob);
router.get("/applications", auth('user'), UserJobController.getAllApplications);
router.get("/applied-jobs/:userId", auth('user') ,UserJobController.getAppliedJobsByUser);


export const UserAppRoute = router;
