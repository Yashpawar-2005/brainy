"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const Interface_1 = require("../helpers/Interface");
const Client_1 = __importDefault(require("../helpers/Client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responce_1 = require("../helpers/responce");
const dotenv_1 = require("../helpers/dotenv");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Inputdata = Interface_1.signupinteface.parse(req.body);
        const hassedpassword = yield bcrypt_1.default.hash(Inputdata.password, 4);
        if (!dotenv_1.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        // jwt.sign()
        const d = yield Client_1.default.user.create({
            data: {
                // sharableLink:random(10),
                username: Inputdata.username,
                password: hassedpassword,
                email: Inputdata.email
            }
        });
        const wait = jsonwebtoken_1.default.sign({ userId: d.id }, dotenv_1.JWT_SECRET);
        res.cookie("jwt_token", wait, {
            httpOnly: true,
            secure: true
        });
        res.json((0, responce_1.responce)({ status: 200, message: "signup complete", data: d, frontend: "signup complete" }));
        return;
    }
    catch (error) {
        res.json((0, responce_1.responce)({ status: 500, message: "some error", data: "some error", frontend: "signup uncessufll" }));
        return;
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Inputdata = Interface_1.signininteface.parse(req.body);
        const user = yield Client_1.default.user.findUnique({
            where: {
                email: Inputdata.email
            }
        });
        if (!user) {
            res.status(401).json((0, responce_1.responce)({
                status: 401,
                message: "Invalid username or password",
                data: null,
                frontend: "Login failed"
            }));
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(Inputdata.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json((0, responce_1.responce)({
                status: 401,
                message: "Invalid username or password",
                data: null,
                frontend: "Login failed"
            }));
            return;
        }
        if (!dotenv_1.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, dotenv_1.JWT_SECRET);
        res.cookie("jwt_token", token, {
            httpOnly: true,
            secure: true
        });
        res.json((0, responce_1.responce)({
            status: 200,
            message: "Login successful",
            data: user,
            frontend: "Login complete"
        }));
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json((0, responce_1.responce)({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Login failed"
        }));
        return;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("jwt_token");
        res.json((0, responce_1.responce)({ status: 200, message: "logout complete", data: "hi", frontend: "logout complete" }));
        return;
    }
    catch (error) {
        res.status(500).json((0, responce_1.responce)({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Login failed"
        }));
        return;
    }
});
exports.logout = logout;
