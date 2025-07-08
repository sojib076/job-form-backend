"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAppRoute = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const router = express_1.default.Router();
router.post("/apply", User_controller_1.UserJobController.applyForJob);
router.get("/applications", User_controller_1.UserJobController.getAllApplications);
router.get("/applied-jobs/:userId", User_controller_1.UserJobController.getAppliedJobsByUser);
exports.UserAppRoute = router;
