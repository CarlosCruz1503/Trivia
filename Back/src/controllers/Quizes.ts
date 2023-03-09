import express from "express"
import { QuizModel } from "../models/Quizes"
import { handleError } from "../utils/handleError"
import { matchedData } from "express-validator"
import { Db } from 'mongodb'

export const getQuizes = async (req: express.Request, res: express.Response) => {
    try {
        const quizes = await QuizModel.find({}).populate("image").sort("-popularity")
        let quizesPublic: any[] = []
        quizes.map((quiz) => {
            if (quiz.private == false) {
                quizesPublic.push(quiz)
            }
        })
        res.send(quizesPublic)
    } catch (e) {
        console.log(e)
        handleError(res, "GET QUIZES WRONG", 400)
    }
}

export const getQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        const quiz = await QuizModel.findById(id).populate("image").populate("author").select("-_id")
        if (quiz) {
            console.log(quiz.popularity)
            quiz.popularity++
            console.log(quiz.popularity)
            const quizNew = await QuizModel.findByIdAndUpdate(id, quiz)
            let actuQuiz = await QuizModel.findById(id).populate("image").populate("author")
            res.send(actuQuiz)
        } else {
            handleError(res, "GET QUIZES WRONG", 400)
        }
    } catch (e) {
        console.log(e)
        handleError(res, "GET QUIZES WRONG", 400)
    }
}

export const createQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const body = matchedData(req)
        const quiz = await (await (await QuizModel.create(body)).populate("image")).populate("author")
        res.send(quiz)
    } catch {
        handleError(res, "CREATE QUIZ WRONG", 400)
    }
}

export const deleteQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        console.log(id)
        const quiz = await QuizModel.deleteOne({_id:id})
        console.log("hola")
        res.send(quiz)
    } catch {
        handleError(res, "DELETE QUIZ WRONG", 400)
    }
}

export const updateQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const { id, ...body } = matchedData(req)
        const data = await QuizModel.findByIdAndUpdate(
            id, body
        )
        let actuQuiz = await QuizModel.findById(id).populate("image").populate("author")
        res.send(actuQuiz)
    } catch (e) {
        handleError(res, "UPDATE QUIZ WRONG", 400)
    }
}

export const pointsQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const { id, ...body } = matchedData(req)
        let quizesOld: any = await QuizModel.findById(id).populate("image").select("-_id")
        quizesOld.points.push(body)
        const quiz = await QuizModel.findByIdAndUpdate(id, quizesOld)
        let quizPoints = await QuizModel.findById(id).select("points").sort("points")
        res.send(quizPoints)
    } catch (e) {
        handleError(res, "UPDATE QUIZ WRONG", 400)
    }
}

export const getPointsQuiz = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        console.log(id)
        let quizPoints = await QuizModel.findById(id).select("points")
        res.send(quizPoints)
    } catch (e) {
        handleError(res, "GET POINTS QUIZ WRONG", 400)
    }
}



