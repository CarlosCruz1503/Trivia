import express from "express"
import { UserModel } from "../models/Users"
import { handleError } from "../utils/handleError"
import { createUser, loginUser,getUser } from "../controllers/User"

const router = express.Router()

router.post("/register",createUser)

router.post("/login",loginUser)

router.get("/:id", getUser)

export default router