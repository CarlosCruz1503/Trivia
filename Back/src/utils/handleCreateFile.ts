const multer = require("multer")
import express from "express"

const storage = multer.diskStorage({
    destination:function(req:express.Request, file:any, cb:any){
        const pathStorage = `${__dirname}/../storage`
        cb(null, pathStorage)
    },
    filename:function(req:express.Request, file:any, cb:any){
        const ext = file.originalname.split(".").pop()
        const filename = `file-${Date.now()}.${ext}`
        cb(null, filename)
    }
})

export const uploadMiddleware = multer({storage})
