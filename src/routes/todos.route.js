import {Router, urlencoded} from "express"
import express from "express"
import { createTask , deleteTask , taskComplete } from "../controllers/todo.controller.js"
import verifyUser from "../middlewares/userAuth.middleware.js"

const todorouter = Router()

todorouter.route("/task").post(createTask)
todorouter.route("/task/:id").delete(deleteTask)
todorouter.route("/task/:id").patch(taskComplete)

export default todorouter