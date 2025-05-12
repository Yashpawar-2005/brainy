"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authcheck = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responce_1 = require("../helpers/responce");
const dotenv_1 = require("../helpers/dotenv");
const authcheck = (req, res, next) => {
    try {
        const jwttoken = req.cookies.jwt_token;
        if (!jwttoken) {
            res.status(401).json((0, responce_1.responce)({
                status: 401,
                message: "No token provided",
                data: null,
                frontend: "You are unauthorized"
            }));
            return;
        }
        if (!dotenv_1.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(jwttoken, dotenv_1.JWT_SECRET);
        if (!decoded.userId) {
            return;
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(500).json((0, responce_1.responce)({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Something went wrong try again"
        }));
        return;
    }
};
exports.authcheck = authcheck;
