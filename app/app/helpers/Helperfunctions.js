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
exports.getFromFollection = exports.generateEmbedding = exports.getTranscript = exports.saveDataToCollection = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("./dotenv");
const genai_1 = require("@google/genai");
const chromadb_1 = require("chromadb");
const dotenv_2 = require("./dotenv");
const dotenv_3 = require("../helpers/dotenv");
const chromaclient = new chromadb_1.ChromaClient({ path: dotenv_2.CHROMA_DB_URL });
const getTranscript = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: dotenv_1.YOUTUBE_TRANS_URL,
        params: { videoId: `${videoId}` },
        headers: {
            'x-rapidapi-key': dotenv_1.RAPID_API,
            'x-rapidapi-host': dotenv_1.RAPID_HOST
        }
    };
    try {
        const response = yield axios_1.default.request(options);
        let tempString = "";
        for (let index = 0; index < response.data.transcript.length; index++) {
            tempString += response.data.transcript[index].text;
        }
        return tempString;
    }
    catch (error) {
        console.error('Error fetching transcript:', error);
        throw new Error('Failed to get transcript');
    }
});
exports.getTranscript = getTranscript;
const generateEmbedding = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const ai = new genai_1.GoogleGenAI({ apiKey: dotenv_3.GEMINI_API_KEY });
    try {
        const embeddingResponse = yield ai.models.embedContent({
            model: 'gemini-embedding-exp-03-07',
            contents: [text],
            config: { taskType: 'RETRIEVAL_QUERY' }
        });
        if (!embeddingResponse.embeddings) {
            throw new Error('No embeddings generated');
        }
        return embeddingResponse.embeddings[0].values;
    }
    catch (error) {
        console.error('Error generating embeddings:', error);
        throw new Error('Failed to generate embeddings');
    }
});
exports.generateEmbedding = generateEmbedding;
const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 10);
};
const saveDataToCollection = (userId, linkId, text, embedding) => __awaiter(void 0, void 0, void 0, function* () {
    const randomId = generateRandomId();
    // console.log("chekc")
    const collection = yield chromaclient.getCollection({ name: "youtube" });
    // console.log("ch")
    try {
        yield collection.add({
            ids: [randomId],
            embeddings: [embedding],
            metadatas: [{ userId: `${userId}`, linkId: `${linkId}` }],
            documents: [text]
        });
        console.log("j");
    }
    catch (error) {
        console.error('Error saving data:', error);
        throw new Error('Failed to save data');
    }
});
exports.saveDataToCollection = saveDataToCollection;
const getFromFollection = (embedding) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield chromaclient.getCollection({ name: "youtube" });
    const result = yield collection.query({
        queryEmbeddings: [embedding],
        nResults: 3,
    });
    return result;
});
exports.getFromFollection = getFromFollection;
