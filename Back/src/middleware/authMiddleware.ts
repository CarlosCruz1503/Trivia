import jwt from "jsonwebtoken"
import express from "express"
import { handleError } from "../utils/handleError";
require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY || "carlos123"

export const authRequired = async (req: express.Request, res: express.Response, next: any) => {
    if (req.headers.authorization) {
        const tokenJWT = req.headers.authorization.split(" ").pop()
        if (tokenJWT) {
            try {
                var decoded = jwt.verify(tokenJWT, SECRET_KEY);
                console.log(decoded)
                next()
            }catch(e){
                handleError(res, "ERROR TOKEN NOT VALID", 400)
            }
        }
    }else {
        handleError(res, "NEED LOGIN", 400)
    }
} 