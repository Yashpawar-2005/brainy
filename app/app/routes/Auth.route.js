"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_controller_1 = require("../controllers/Auth.controller");
const authRoute = (0, express_1.Router)();
authRoute.post("/signup", Auth_controller_1.signup);
authRoute.post("/login", Auth_controller_1.login);
authRoute.get("/logout", Auth_controller_1.logout);
exports.default = authRoute;
