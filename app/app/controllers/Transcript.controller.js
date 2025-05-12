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
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const Helperfunctions_1 = require("../helpers/Helperfunctions");
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searching = req.body.search;
    const userId = req.userId;
    const embedding = yield (0, Helperfunctions_1.generateEmbedding)(searching);
    if (!embedding) {
        return;
    }
    const data_from_chroma_db = yield (0, Helperfunctions_1.getFromFollection)(embedding);
    res.json({ message: data_from_chroma_db });
});
exports.search = search;
