import express from "express"
import { UserModel } from "../models/Users"
import { handleError } from "../utils/handleError"
import { createUser, loginUser,getUser,imageUser } from "../controllers/User"
import { createUserValidator, imageUserValidator, loginValidator } from "../validations/Users"
import { authRequired } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/register", createUserValidator,createUser)

router.post("/login",loginValidator, loginUser)

router.get("/:id", getUser)

router.post("/:id", authRequired, imageUserValidator,imageUser)

export default router