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
exports.createTranscript = void 0;
const Interface_1 = require("../helpers/Interface");
const Client_1 = __importDefault(require("../helpers/Client"));
const responce_1 = require("../helpers/responce");
const createTranscript = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = Interface_1.linkinterface.parse(req.body);
        const title = req.body.title;
        const InputData = req.body.Link;
        const input = req.body.type;
        const userId = req.userId;
        console.log(input, InputData, userId);
        if (!userId) {
            return;
        }
        const datq = yield Client_1.default.link.create({
            data: {
                title: title,
                linkUrl: InputData,
                type: input,
                userid: parseInt(userId)
            }
        });
        req.linkId = `${datq.id}`;
        next();
        // res.status(200).json(responce({status:200,frontend:"Created Link",data:datq,message:"nicley done"}))
        // return
    }
    catch (error) {
        console.log(error);
        res.status(500).json((0, responce_1.responce)({
            status: 500,
            message: "Internal server error",
            data: null,
            frontend: "Unable to create link"
        }));
        return;
    }
});
exports.createTranscript = createTranscript;
