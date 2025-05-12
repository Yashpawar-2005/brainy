"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("./helpers/dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const DBconnect_1 = require("./db/DBconnect");
const Auth_route_1 = __importDefault(require("./routes/Auth.route"));
const Link_route_1 = __importDefault(require("./routes/Link.route"));
const Trascript_route_1 = __importDefault(require("./routes/Trascript.route"));
(0, DBconnect_1.connect)();
(0, DBconnect_1.connectchroma)();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        express_1.default.json()(req, res, next); // Only parse JSON for POST, PUT, PATCH
    }
    else {
        next(); // Skip JSON parsing for GET and other methods
    }
});
app.use((0, cookie_parser_1.default)());
app.get(`${dotenv_1.Start}/healthcheck`, (req, res) => {
    console.log("hitting");
    res.json({ message: "working" });
});
app.use(`${dotenv_1.Start}/auth`, Auth_route_1.default);
app.use(`${dotenv_1.Start}/link`, Link_route_1.default);
app.use(`${dotenv_1.Start}/trans`, Trascript_route_1.default);
console.log(dotenv_1.port);
app.listen(dotenv_1.port || 4000, () => {
    console.log("lisening nicely");
});
