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
exports.getalllinks = exports.deleteLink = exports.createLink = void 0;
const Client_1 = __importDefault(require("../helpers/Client"));
const responce_1 = require("../helpers/responce");
const Interface_1 = require("../helpers/Interface");
const Helperfunctions_1 = require("../helpers/Helperfunctions");
const createsharable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const deleteLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Interface_1.deletelinkinterface.parse(req.body);
        const linkId = req.body.linkId;
        const userId = req.userId;
        const datq = Client_1.default.link.delete({
            where: {
                id: linkId
            }
        });
        res.status(200).json((0, responce_1.responce)({ status: 200, frontend: "deleted Link", data: datq, message: "nicley done" }));
        return;
    }
    catch (error) {
        res.status(500).json((0, responce_1.responce)({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Unable to create link"
        }));
        return;
    }
});
exports.deleteLink = deleteLink;
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hitting");
    const { userId, linkId } = req;
    const { videoId } = req.body;
    if (!userId) {
        res.status(400).json({
            status: 400,
            message: "Missing userId",
            data: null,
            frontend: "UserId is required"
        });
        return;
    }
    try {
        const tempString = yield (0, Helperfunctions_1.getTranscript)(videoId);
        console.log("1st");
        const embedding = yield (0, Helperfunctions_1.generateEmbedding)(tempString);
        console.log("2nd");
        // console.log(linkId,embedding)
        if (!linkId || !embedding) {
            return;
        }
        // console.log("hi")
        yield (0, Helperfunctions_1.saveDataToCollection)(userId, linkId, tempString, embedding);
        console.log("3rd");
        res.status(200).json({
            status: 200,
            message: "Nicely done",
            data: null,
            frontend: "Created the link"
        });
    }
    catch (error) {
        console.error('Error in creating link:', error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Unable to create link"
        });
    }
});
exports.createLink = createLink;
exports.default = createLink;
const getalllinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return;
    const datq = yield Client_1.default.link.findMany({
        where: {
            userid: parseInt(userId)
        }
    });
    res.status(200).json({
        status: 200,
        message: "Nicely done",
        data: datq,
        frontend: "Fetch from backend done"
    });
});
exports.getalllinks = getalllinks;
