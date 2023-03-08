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
exports.createStorage = void 0;
const Storage_1 = require("../models/Storage");
const handleError_1 = require("../utils/handleError");
require("dotenv").config();
const PUBLIC_URL = process.env.PUBLIC_URL;
const createStorage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/storage/${file.filename}`
        };
        const data = yield Storage_1.StorageModel.create(fileData);
        res.send(data);
    }
    catch (e) {
        console.log(e);
        (0, handleError_1.handleError)(res, "ERROR CREATE STORAGE", 400);
    }
});
exports.createStorage = createStorage;
