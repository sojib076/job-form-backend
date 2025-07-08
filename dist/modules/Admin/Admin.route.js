"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const Admin_controller_1 = require("./Admin.controller");
const router = express_1.default.Router();
// @route   POST /api/v1/jobs
// @desc    Admin can post a new job
// @access  Admin only (auth middleware can be added later)
router.post("/admin-post", Admin_controller_1.AdminJobController.postJob);
exports.AdminRoute = router;
