import express from "express"
import { StorageModel } from "../models/Storage"
import { handleError } from "../utils/handleError"
require("dotenv").config()

const PUBLIC_URL = process.env.PUBLIC_URL

export const createStorage = async (req: any, res: express.Response) => {
    try {
        const { body, file } = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/storage/${file.filename}`
        }
        const data = await StorageModel.create(fileData)
        res.send(data)
    } catch (e) {
        console.log(e)
        handleError(res,  "ERROR CREATE STORAGE",400)
    }
}