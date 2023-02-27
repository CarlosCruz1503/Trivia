import express from "express"
import { UserModel } from "../models/Users"
import { handleError } from "../utils/handleError"
import { comparePassword, encrypt } from "../utils/handlePassword";
import jwt from 'jsonwebtoken'
import { compare } from "bcrypt";
import { matchedData } from "express-validator/src/matched-data";
require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY || "carlos123"

export const createUser = async (req: express.Request, res: express.Response) => {
    try {
        let body  = matchedData(req)
        console.log(body)
        const password = await encrypt(body.password)
        body = {
            ...body,
            password
        }
        const user = await UserModel.create(body)
        user.set("password", undefined, { strict: false })
        var token = jwt.sign({user}, SECRET_KEY,);
        const userData = {
            token,
            user
        }
        res.send(userData)
    } catch (e) {
        console.log(e)
        handleError(res, "ERROR REGISTER", 400)
    }
}

export const loginUser = async (req: express.Request, res: express.Response) => {
    try {
        let body  = matchedData(req)
        const user: any = await UserModel.findOne({ email: body.email }).select("password name email image id").populate("image")
        const isCorrect = await comparePassword(body.password, user.password)
        var token = jwt.sign({user} , SECRET_KEY);
        user.set("password", undefined, { strict: false })
        if (isCorrect) {
            const userData = {
                token,
                user
            }
            res.send(userData)
        } else {
            handleError(res, "ERROR PASSWORD WRONG", 400)
        }
    } catch (e) {
        handleError(res, "ERROR LOGIN", 400)
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        const user = await UserModel.findById(id).populate("image")
        res.send(user)
    } catch {
        handleError(res, "GET USER WRONG", 400)
    }
}

export const imageUser = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        const image = req.body
        const user = await UserModel.findById(id).populate("image")
        if (user){
            user.image = image.image
            const data = await UserModel.findByIdAndUpdate(
                id, user
            )
            let actuUser: any = await UserModel.findById(id).populate("image")
            res.send(actuUser)
        } else {
            handleError(res, "USER DOESNT EXIST", 400)
        }
        
    } catch {
        handleError(res, "UPDATE IMAGE USER WRONG", 400)
    }
}