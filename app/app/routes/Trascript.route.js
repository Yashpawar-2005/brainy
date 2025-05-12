"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const Transcript_controller_1 = require("../controllers/Transcript.controller");
const transcriptrouter = (0, express_1.Router)();
transcriptrouter.post("/search", authmiddleware_1.authcheck, Transcript_controller_1.search);
exports.default = transcriptrouter;
