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
exports.deleteLink = exports.gettranscript = exports.createLink = void 0;
const Client_1 = __importDefault(require("../helpers/Client"));
const responce_1 = require("../helpers/responce");
const dotenv_1 = require("../helpers/dotenv");
const Interface_1 = require("../helpers/Interface");
const axios_1 = __importDefault(require("axios"));
const genai_1 = require("@google/genai");
const dotenv_2 = require("../helpers/dotenv");
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = Interface_1.linkinterface.parse(req.body);
        const InputData = req.body.Link;
        const input = req.body.type;
        const userId = req.userId;
        console.log(input, InputData, userId);
        if (!userId) {
            return;
        }
        const datq = Client_1.default.link.create({
            data: {
                linkUrl: InputData,
                type: input,
                userid: parseInt(userId)
            }
        });
        res.status(200).json((0, responce_1.responce)({ status: 200, frontend: "Created Link", data: datq, message: "nicley done" }));
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
exports.createLink = createLink;
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
const gettranscript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hitting");
    const options = {
        method: 'GET',
        url: dotenv_2.YOUTUBE_TRANS_URL,
        params: {
            videoId: '5RT6QMKJTjQ'
        },
        headers: {
            'x-rapidapi-key': dotenv_2.RAPID_API,
            'x-rapidapi-host': dotenv_2.RAPID_HOST
        }
    };
    try {
        let tempstring = "";
        console.log("started");
        const response = yield axios_1.default.request(options);
        console.log(response.data);
        for (let index = 0; index < response.data.transcript.length; index++) {
            tempstring += response.data.transcript[index].text;
        }
        // const result = await collection.add({
        //         ids: new Array(embeddings.length).fill(userId), // Set the user ID for all embeddings
        //         embeddings: embeddings,                        // The embedding data
        //         metadatas: new Array(embeddings.length).fill({ user_id: userId }), // User ID metadata
        //         documents: documents                          // The documents associated with each embedding
        //     });
        function main() {
            return __awaiter(this, void 0, void 0, function* () {
                const ai = new genai_1.GoogleGenAI({ apiKey: dotenv_1.GEMINI_API_KEY });
                try {
                    const response = yield ai.models.embedContent({
                        model: 'gemini-embedding-exp-03-07',
                        contents: [tempstring],
                        config: {
                            taskType: 'RETRIEVAL_QUERY',
                        },
                    });
                    console.log(response.embeddings);
                    res.json({ message: response.embeddings });
                    return;
                }
                catch (error) {
                    console.error('Error generating embeddings:', error);
                }
            });
        }
        main();
    }
    catch (error) {
        console.error(error);
    }
});
exports.gettranscript = gettranscript;
