"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEMINI_API_KEY = exports.RAPID_HOST = exports.RAPID_API = exports.YOUTUBE_TRANS_URL = exports.CHROMA_DB_URL = exports.JWT_SECRET = exports.RELATIONAL_DB_URL = exports.Start = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.PORT;
exports.Start = process.env.STARTPOINT;
exports.RELATIONAL_DB_URL = process.env.RELATIONAL_DB_URL;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.CHROMA_DB_URL = process.env.CHROMA_DB_URL;
exports.YOUTUBE_TRANS_URL = process.env.YOUTUBE_TRANS_URL;
exports.RAPID_API = process.env.RAPID_API;
exports.RAPID_HOST = process.env.RAPID_HOST;
exports.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
