import express from "express";
import { AdminJobController } from "./Admin.controller";
import { auth } from "../../middlewares/auth";


const router = express.Router();


router.post("/admin-post", auth('admin') , AdminJobController.postJob);
router.patch("/:id", auth('admin') , AdminJobController.updateJob);
router.delete("/:id",auth('admin') , AdminJobController.deleteJob);
router.get("/", AdminJobController.getAllJobs);

export const AdminRoute = router;
