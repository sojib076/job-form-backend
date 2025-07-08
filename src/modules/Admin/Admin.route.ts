import express from "express";
import { AdminJobController } from "./Admin.controller";


const router = express.Router();


router.post("/admin-post", AdminJobController.postJob);
router.patch("/:id", AdminJobController.updateJob);
router.delete("/:id", AdminJobController.deleteJob);
router.get("/", AdminJobController.getAllJobs);

export const AdminRoute = router;
