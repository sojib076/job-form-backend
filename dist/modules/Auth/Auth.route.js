"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const Auth_controller_1 = require("./Auth.controller");
const router = (0, express_1.Router)();
router.post("/login", Auth_controller_1.AuthController.loginUser);
router.post("/signup", Auth_controller_1.AuthController.signupUser);
exports.AuthRoute = router;
