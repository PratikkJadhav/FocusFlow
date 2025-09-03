import {Router, urlencoded} from "express"
import express from "express"
import { createTask , deleteTask } from "../controllers/todo.controller.js"
import verifyUser from "../middlewares/auth.middleware.js"

const todorouter = Router()

todorouter.route("/task").post(createTask)
todorouter.route("/task/:id").delete(verifyUser , deleteTask)


export default todorouter