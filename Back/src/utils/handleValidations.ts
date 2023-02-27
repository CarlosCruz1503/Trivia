import express from "express"
const { validationResult } = require("express-validator")

export const validateResults= (req:express.Request ,res:express.Response, next:any) => {
    try{
        validationResult(req).throw()
        return next()
    } catch (err:any){
        res.status(403)
        res.send({errors:err.array()})
    }
}
