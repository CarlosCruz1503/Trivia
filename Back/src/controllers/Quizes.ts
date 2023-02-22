import express from "express"
import { QuizModel } from "../models/Quizes"
import { handleError } from "../utils/handleError"

export const getQuizes = async (req: express.Request, res: express.Response) => {
    try {
        const quizes = await QuizModel.find({}).populate("image")
        let quizesPublic: any = []
        quizes.map((quiz) => {
            if (quiz.private == false) {
                quizesPublic.push(quiz)
            }
        })
        res.send(quizesPublic)
    } catch (e) {
        handleError(res, "GET QUIZES WRONG", 400)
    }
}

export const getQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        console.log(id)
        const quizes = await QuizModel.findById(id).populate("image")
        console.log(quizes)
        res.send(quizes)
    } catch {
        handleError(res, "GET QUIZES WRONG", 400)
    }
}

export const createQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const body = req.body
        const quizes = await (await (await QuizModel.create(body)).populate("image")).populate("author")
        res.send(quizes)
    } catch {
        handleError(res, "CREATE QUIZ WRONG", 400)
    }
}

export const deleteQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        console.log(id)
        const quizes = await QuizModel.remove({ id })
        console.log(quizes)
        res.send(quizes)
    } catch {
        handleError(res, "DELETE QUIZ WRONG", 400)
    }
}

export const updateQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        const body = req.body
        console.log(id)
        const quizes = await QuizModel.updateOne({ id, ...body })
        console.log(quizes)
        res.send(quizes)
    } catch {
        handleError(res, "UPDATE QUIZ WRONG", 400)
    }
}

export const PointsQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        const body = req.body
        let quizesOld: any = await QuizModel.findById(id).populate("image").select("-_id")
        quizesOld.points.push(body)
        const quizes = await QuizModel.findByIdAndUpdate(id,quizesOld)
        res.send(quizes)
    } catch(e) {
        console.log(e)
        handleError(res, "UPDATE QUIZ WRONG", 400)
    }
}


