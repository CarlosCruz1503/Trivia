import express from "express"
import { QuizModel } from "../models/Quizes"
import { handleError } from "../utils/handleError"
import { getQuizes, getQuiz, createQuiz, deleteQuiz, updateQuiz,PointsQuiz } from "../controllers/Quizes"

const router = express.Router()

router.get(("/"), getQuizes)

router.get(("/:id"), getQuiz)

router.post(("/"), createQuiz)

router.delete(("/:id"),deleteQuiz)

router.put(("/:id"),updateQuiz)

router.post(("/points/:id"), PointsQuiz)


export default router