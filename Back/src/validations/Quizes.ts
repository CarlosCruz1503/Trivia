import { check } from "express-validator"
import { validateResults } from "../utils/handleValidations"
import express from "express"

export const createQuizValidator = [
    check("name")
        .exists()
        .notEmpty(),
    check("questions")
        .isArray()
        .exists()
        .notEmpty()
        .isLength({ min: 4 }),
    check("questions.*.questionsTitle")
        .exists()
        .notEmpty(),
    check("quiestions.*.answers.*.answerTitle")
        .notEmpty()
        .exists(),
    check("questions.*.answers.*.correct")
        .isBoolean(),
    check("private")
        .isBoolean(),
    check("image")
        .notEmpty()
        .isMongoId(),
    check("author")
        .notEmpty()
        .isString(),
    check("points")
        .isArray()
        .exists(),
    check("points.*.user")
        .exists()
        .isString(),
    check("points.*.points")
        .exists()
        .isNumeric(),
    (req: express.Request, res: express.Response, next: any) => {
        return validateResults(req, res, next)
    }
]

export const editQuizValidator = [
    check("id")
        .isMongoId(),
    check("name")
        .exists()
        .notEmpty(),
    check("questions")
        .isArray()
        .exists()
        .notEmpty()
        .isLength({ min: 4 }),
    check("questions.*.questionsTitle")
        .exists()
        .notEmpty(),
    check("quiestions.*.answers.*.answerTitle")
        .notEmpty()
        .exists(),
    check("questions.*.answers.*.correct")
        .isBoolean(),
    check("private")
        .isBoolean(),
    check("image")
        .notEmpty()
        .isMongoId(),
    check("author")
        .notEmpty()
        .isString(),
    check("points")
        .isArray()
        .exists(),
    check("points.*.name")
        .isString()
        .exists(),
    check("points.*.pointsUser")
        .exists()
        .isNumeric(),
    (req: express.Request, res: express.Response, next: any) => {
        return validateResults(req, res, next)
    }
]

export const pointQuizValidator = [
    check("id")
        .isMongoId(),
    check("name")
        .exists()
        .notEmpty(),
    check("pointsUser")
        .isNumeric()
        .notEmpty(),
    (req: express.Request, res: express.Response, next: any) => {
        return validateResults(req, res, next)
    }
]