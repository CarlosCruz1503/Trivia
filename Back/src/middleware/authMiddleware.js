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
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleError_1 = require("../utils/handleError");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY || "carlos123";
const authRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization) {
        const tokenJWT = req.headers.authorization.split(" ").pop();
        if (tokenJWT) {
            try {
                var decoded = jsonwebtoken_1.default.verify(tokenJWT, SECRET_KEY);
                console.log(decoded);
                next();
            }
            catch (e) {
                (0, handleError_1.handleError)(res, "ERROR TOKEN NOT VALID", 400);
            }
        }
    }
    else {
        (0, handleError_1.handleError)(res, "NEED LOGIN", 400);
    }
});
exports.authRequired = authRequired;
