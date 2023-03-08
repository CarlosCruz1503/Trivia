"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Quizes_1 = __importDefault(require("./routes/Quizes"));
const Storage_1 = __importDefault(require("./routes/Storage"));
const Users_1 = __importDefault(require("./routes/Users"));
require("dotenv").config();
const handleDBConnect_1 = require("./utils/handleDBConnect");
const app = (0, express_1.default)();
const URI = process.env.URI || "Not URI";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("storage"));
app.use('/storage', express_1.default.static(__dirname + '/storage'));
const PORT = 3000;
const PUBLIC_URL = process.env.PUBLIC_URL;
app.use(("/api/quiz"), Quizes_1.default);
app.use(("/api/storage"), Storage_1.default);
app.use(("/api/user"), Users_1.default);
app.listen(PORT, () => {
    (0, handleDBConnect_1.connectDB)(URI);
    console.log(PUBLIC_URL);
    console.log("PORT");
});
