import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/user.route.js"
import todorouter from "./routes/todos.route.js"

const app = express()

app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:8000",
    credentials:true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api" , router)
app.use("/api" , todorouter)
export default app;