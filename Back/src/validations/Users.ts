import { check } from "express-validator"
import type { RequestHandler } from "express";
import { validateResults } from "../utils/handleValidations";
import express from "express"

export const createUserValidator = [
    check("name")
        .exists()
        .notEmpty(),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 8 }),
    check("image")
        .exists()
        .isMongoId(),
    (req:express.Request, res:express.Response, next:any) => {
        return validateResults(req, res, next)
    }
]

export const loginValidator = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 8 }),
    (req:express.Request, res:express.Response, next:any) => {
        return validateResults(req, res, next)
    }
]

export const imageUserValidator = [
    check("image")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req:express.Request, res:express.Response, next:any) => {
        return validateResults(req, res, next)
    }
]



