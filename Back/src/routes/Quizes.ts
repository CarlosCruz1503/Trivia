import express from "express"
import { QuizModel } from "../models/Quizes"
import { handleError } from "../utils/handleError"
import { getQuizes, getQuiz, createQuiz, deleteQuiz, updateQuiz,pointsQuiz } from "../controllers/Quizes"
import { createQuizValidator, editQuizValidator, pointQuizValidator } from "../validations/Quizes"
import { authRequired } from "../middleware/authMiddleware"

const router = express.Router()

router.get(("/"), getQuizes)

router.get(("/:id"), getQuiz)

router.post(("/"),  createQuizValidator,createQuiz)

router.delete(("/:id"), deleteQuiz)

router.put(("/:id"),  editQuizValidator,updateQuiz)

router.post(("/points/:id"), pointQuizValidator,pointsQuiz)

export default router