"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleCreateFile_1 = require("../utils/handleCreateFile");
const Storage_1 = require("../controllers/Storage");
require("dotenv").config();
const PUBLIC_URL = process.env.PUBLIC_URL;
const router = express_1.default.Router();
router.post(("/"), handleCreateFile_1.uploadMiddleware.single("myFile"), Storage_1.createStorage);
exports.default = router;
