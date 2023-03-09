const mongoose = require("mongoose")

const dotenv = require('dotenv');

dotenv.config()

export const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    console.log(DB_URI)
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
