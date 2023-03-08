"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Quizes_1 = require("../controllers/Quizes");
const Quizes_2 = require("../validations/Quizes");
const router = express_1.default.Router();
router.get(("/"), Quizes_1.getQuizes);
router.get(("/:id"), Quizes_1.getQuiz);
router.post(("/"), Quizes_2.createQuizValidator, Quizes_1.createQuiz);
router.delete(("/:id"), Quizes_1.deleteQuiz);
router.put(("/:id"), Quizes_2.editQuizValidator, Quizes_1.updateQuiz);
router.post(("/points/:id"), Quizes_2.pointQuizValidator, Quizes_1.pointsQuiz);
router.get(("/points/:id"), Quizes_1.getPointsQuiz);
exports.default = router;
