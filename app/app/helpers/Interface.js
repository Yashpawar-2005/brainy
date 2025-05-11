"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signininteface = exports.signupinteface = void 0;
const zod_1 = require("zod");
const signupinteface = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    email: zod_1.z.string().email()
});
exports.signupinteface = signupinteface;
const signininteface = zod_1.z.object({
    password: zod_1.z.string(),
    username: zod_1.z.string()
});
exports.signininteface = signininteface;
