"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Quiz = new Schema({
    name: String,
    questions: [{
            questionsTitle: String,
            answers: [{
                    answerTitle: String,
                    correct: Boolean
                }]
        }],
    popularity: {
        type: Number,
        default: 0,
    },
    private: Boolean,
    image: { type: Schema.Types.ObjectId, ref: 'StorageModel' },
    author: String,
    points: [{
            name: String,
            pointsUser: Number
        }],
}, {
    timestamps: true,
    versionKey: false
});
exports.QuizModel = mongoose_1.default.model('QuizModel', Quiz);
