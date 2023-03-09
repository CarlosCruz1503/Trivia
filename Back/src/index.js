"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Quizes_1 = __importDefault(require("./routes/Quizes"));
const Storage_1 = __importDefault(require("./routes/Storage"));
const Users_1 = __importDefault(require("./routes/Users"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/.env' });
const handleDBConnect_1 = require("./utils/handleDBConnect");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("storage"));
app.use('/storage', express_1.default.static(__dirname + '/storage'));
const PORT = 3001;
const PUBLIC_URL = process.env.PUBLIC_URL;
app.use(("/api/quiz"), Quizes_1.default);
app.use(("/api/storage"), Storage_1.default);
app.use(("/api/user"), Users_1.default);
(0, handleDBConnect_1.dbConnect)();
app.listen(PORT, () => {
    console.log(PUBLIC_URL);
    console.log("PORT");
});
