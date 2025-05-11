"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responce = void 0;
const responce = (s) => {
    return {
        status: s.status,
        message: s === null || s === void 0 ? void 0 : s.message,
        data: s === null || s === void 0 ? void 0 : s.data,
        display_on_frontend: s === null || s === void 0 ? void 0 : s.frontend,
    };
};
exports.responce = responce;
