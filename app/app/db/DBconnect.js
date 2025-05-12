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
exports.connectchroma = exports.connect = void 0;
const Client_1 = __importDefault(require("../helpers/Client"));
const chromadb_1 = require("chromadb");
const dotenv_1 = require("../helpers/dotenv");
const clientt = new chromadb_1.ChromaClient({ path: dotenv_1.CHROMA_DB_URL });
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Client_1.default.$connect();
        console.log("connected");
    }
    catch (error) {
        console.log("error while connecting");
    }
});
exports.connect = connect;
const connectchroma = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let youtubechroma = yield clientt.getCollection({ name: "youtube" }).catch(() => null);
        if (!youtubechroma) {
            youtubechroma = yield clientt.createCollection({ name: "youtube" });
            console.log("YouTube collection created");
        }
        else {
            console.log("YouTube collection already exists");
        }
        let twitterchroma = yield clientt.getCollection({ name: "twitter" }).catch(() => null);
        if (!twitterchroma) {
            twitterchroma = yield clientt.createCollection({ name: "twitter" });
            console.log("Twitter collection reated");
        }
        else {
            console.log("Twitter collection already exists");
        }
        return { youtubechroma, twitterchroma };
    }
    catch (error) {
        console.log(error);
        console.log("Error while connecting");
    }
});
exports.connectchroma = connectchroma;
