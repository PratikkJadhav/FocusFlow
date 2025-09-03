import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import asycnHandler from "../utils/AsycnHandler.utils.js";
import { Todos } from "../models/todo.models.js";
import mongoose from "mongoose";

const createTask = asycnHandler(async (req , res)=>{
        const {task , dueDate , ownerID} = req.body
        if(!task || !dueDate || !ownerID){
            throw new ApiError(404 , "Please provide all the necessary details like todos and dueDate")
        }
        const newTask = new Todos({task , dueDate  , ownerID})

        await newTask.save()


        res.status(200).json(newTask)
            
        res.status(200).json(new ApiResponse(200 , {} ,"Successfully created the task"))
    
})

const deleteTask = asycnHandler(async (req , res)=>{
        const currentUserID = req.user?._id
        if(!currentUserID){
            throw new ApiError(404 , "You must be logged In")
        }
        const taskId = req.params.id
        
        if(!taskId){
            throw new ApiError(401 , "No task found")
        }
        const deleteTask = await Todos.findByIdAndDelete({_id : taskId ,  ownerID : currentUserID})

        if(!deleteTask){
            throw new ApiError(401 , "Task not found")
        }

        res.status(200).json(new ApiResponse(200 , {} ,"Successfully deleted the task"))
        
        
})

export {
    createTask,
    deleteTask
}