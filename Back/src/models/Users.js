"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const User = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true // `email` must be unique
    },
    password: { type: String, select: false },
    image: { type: Schema.Types.ObjectId, ref: 'StorageModel' },
});
exports.UserModel = mongoose_1.default.model('UserModel', User);
