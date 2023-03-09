const mongoose = require("mongoose")

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

export const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    console.log(DB_URI)
    console.log( __dirname + '/.env')
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err: any, res: any) => {
        if (!err) {
            console.log("conexion Correcta")
        } else {
            console.log("Error de conexion")
        }
    })
}
mongoose.set('strictQuery', false)
