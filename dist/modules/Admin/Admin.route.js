"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const Admin_controller_1 = require("./Admin.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post("/admin-post", (0, auth_1.auth)('admin'), Admin_controller_1.AdminJobController.postJob);
router.patch("/:id", (0, auth_1.auth)('admin'), Admin_controller_1.AdminJobController.updateJob);
router.delete("/:id", (0, auth_1.auth)('admin'), Admin_controller_1.AdminJobController.deleteJob);
router.get("/", Admin_controller_1.AdminJobController.getAllJobs);
exports.AdminRoute = router;
