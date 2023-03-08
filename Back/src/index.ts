import express from "express"
import cors  from "cors"
import QuizRouter from "./routes/Quizes"
import StorageRouter from "./routes/Storage"
import UserRouter from "./routes/Users"

require("dotenv").config()

import { dbConnect } from "./utils/handleDBConnect"
const app = express()
const URI = process.env.URI || "Not URI" 
console.log(URI)
app.use(cors())
app.use(express.json())
app.use(express.static("storage"))
app.use('/storage', express.static(__dirname + '/storage'));
const PORT = 3000
const PUBLIC_URL = process.env.PUBLIC_URL

app.use(("/api/quiz"), QuizRouter)
app.use(("/api/storage"), StorageRouter)
app.use(("/api/user"), UserRouter)

dbConnect()

app.listen(PORT, () => {
    console.log(PUBLIC_URL)
    console.log("PORT")
})

