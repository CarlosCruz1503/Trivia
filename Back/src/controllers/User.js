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
exports.imageUser = exports.getUser = exports.loginUser = exports.createUser = void 0;
const Users_1 = require("../models/Users");
const handleError_1 = require("../utils/handleError");
const handlePassword_1 = require("../utils/handlePassword");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const matched_data_1 = require("express-validator/src/matched-data");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "carlos123";
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = (0, matched_data_1.matchedData)(req);
        console.log(body);
        const password = yield (0, handlePassword_1.encrypt)(body.password);
        body = Object.assign(Object.assign({}, body), { password });
        const user = yield Users_1.UserModel.create(body);
        user.set("password", undefined, { strict: false });
        var token = jsonwebtoken_1.default.sign({ user }, SECRET_KEY);
        const userData = {
            token,
            user
        };
        res.send(userData);
    }
    catch (e) {
        console.log(e);
        (0, handleError_1.handleError)(res, "ERROR REGISTER", 400);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = (0, matched_data_1.matchedData)(req);
        const user = yield Users_1.UserModel.findOne({ email: body.email }).select("password name email image id").populate("image");
        const isCorrect = yield (0, handlePassword_1.comparePassword)(body.password, user.password);
        var token = jsonwebtoken_1.default.sign({ user }, SECRET_KEY);
        user.set("password", undefined, { strict: false });
        if (isCorrect) {
            const userData = {
                token,
                user
            };
            res.send(userData);
        }
        else {
            (0, handleError_1.handleError)(res, "ERROR PASSWORD WRONG", 400);
        }
    }
    catch (e) {
        (0, handleError_1.handleError)(res, "ERROR LOGIN", 400);
    }
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield Users_1.UserModel.findById(id).populate("image");
        res.send(user);
    }
    catch (_a) {
        (0, handleError_1.handleError)(res, "GET USER WRONG", 400);
    }
});
exports.getUser = getUser;
const imageUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const image = req.body;
        const user = yield Users_1.UserModel.findById(id).populate("image");
        if (user) {
            user.image = image.image;
            const data = yield Users_1.UserModel.findByIdAndUpdate(id, user);
            let actuUser = yield Users_1.UserModel.findById(id).populate("image");
            res.send(actuUser);
        }
        else {
            (0, handleError_1.handleError)(res, "USER DOESNT EXIST", 400);
        }
    }
    catch (_b) {
        (0, handleError_1.handleError)(res, "UPDATE IMAGE USER WRONG", 400);
    }
});
exports.imageUser = imageUser;
