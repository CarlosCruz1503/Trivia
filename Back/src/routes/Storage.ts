import express from "express"
import { StorageModel } from "../models/Storage"
import { uploadMiddleware } from "../utils/handleCreateFile"
import { createStorage } from "../controllers/Storage"
require("dotenv").config()

const PUBLIC_URL = process.env.PUBLIC_URL

const router = express.Router()

router.post(("/"), uploadMiddleware.single("myFile"), createStorage)


export default router