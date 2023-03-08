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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPointsQuiz = exports.pointsQuiz = exports.updateQuiz = exports.deleteQuiz = exports.createQuiz = exports.getQuiz = exports.getQuizes = void 0;
const Quizes_1 = require("../models/Quizes");
const handleError_1 = require("../utils/handleError");
const express_validator_1 = require("express-validator");
const getQuizes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizes = yield Quizes_1.QuizModel.find({}).populate("image").sort("-popularity");
        let quizesPublic = [];
        quizes.map((quiz) => {
            if (quiz.private == false) {
                quizesPublic.push(quiz);
            }
        });
        res.send(quizesPublic);
    }
    catch (e) {
        console.log(e);
        (0, handleError_1.handleError)(res, "GET QUIZES WRONG", 400);
    }
});
exports.getQuizes = getQuizes;
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const quiz = yield Quizes_1.QuizModel.findById(id).populate("image").populate("author").select("-_id");
        if (quiz) {
            console.log(quiz.popularity);
            quiz.popularity++;
            console.log(quiz.popularity);
            const quizNew = yield Quizes_1.QuizModel.findByIdAndUpdate(id, quiz);
            let actuQuiz = yield Quizes_1.QuizModel.findById(id).populate("image").populate("author");
            res.send(actuQuiz);
        }
        else {
            (0, handleError_1.handleError)(res, "GET QUIZES WRONG", 400);
        }
    }
    catch (e) {
        console.log(e);
        (0, handleError_1.handleError)(res, "GET QUIZES WRONG", 400);
    }
});
exports.getQuiz = getQuiz;
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = (0, express_validator_1.matchedData)(req);
        const quiz = yield (yield (yield Quizes_1.QuizModel.create(body)).populate("image")).populate("author");
        res.send(quiz);
    }
    catch (_a) {
        (0, handleError_1.handleError)(res, "CREATE QUIZ WRONG", 400);
    }
});
exports.createQuiz = createQuiz;
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const quiz = yield Quizes_1.QuizModel.deleteOne({ id });
        res.send(quiz);
    }
    catch (_b) {
        (0, handleError_1.handleError)(res, "DELETE QUIZ WRONG", 400);
    }
});
exports.deleteQuiz = deleteQuiz;
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _c = (0, express_validator_1.matchedData)(req), { id } = _c, body = __rest(_c, ["id"]);
        const data = yield Quizes_1.QuizModel.findByIdAndUpdate(id, body);
        let actuQuiz = yield Quizes_1.QuizModel.findById(id).populate("image").populate("author");
        res.send(actuQuiz);
    }
    catch (e) {
        (0, handleError_1.handleError)(res, "UPDATE QUIZ WRONG", 400);
    }
});
exports.updateQuiz = updateQuiz;
const pointsQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _d = (0, express_validator_1.matchedData)(req), { id } = _d, body = __rest(_d, ["id"]);
        let quizesOld = yield Quizes_1.QuizModel.findById(id).populate("image").select("-_id");
        quizesOld.points.push(body);
        const quiz = yield Quizes_1.QuizModel.findByIdAndUpdate(id, quizesOld);
        let quizPoints = yield Quizes_1.QuizModel.findById(id).select("points").sort("points");
        res.send(quizPoints);
    }
    catch (e) {
        (0, handleError_1.handleError)(res, "UPDATE QUIZ WRONG", 400);
    }
});
exports.pointsQuiz = pointsQuiz;
const getPointsQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let quizPoints = yield Quizes_1.QuizModel.findById(id).select("points");
        res.send(quizPoints);
    }
    catch (e) {
        (0, handleError_1.handleError)(res, "GET POINTS QUIZ WRONG", 400);
    }
});
exports.getPointsQuiz = getPointsQuiz;
