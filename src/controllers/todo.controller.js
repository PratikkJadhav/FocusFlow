import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import asycnHandler from "../utils/AsycnHandler.utils.js";
import { Todos } from "../models/todo.models.js";
import mongoose from "mongoose";

const createTask = asycnHandler(async (req , res)=>{
        const ownerId = req.user?._id || req.guest._id
        console.log(req.guestId);
        
        if(!ownerId){
            throw new ApiError(401 , "You must be logged In to create tasks")
        }

        const {task , dueDate } = req.body
        if(!task ){
            throw new ApiError(400 , "Please provide the task")
        }
        
        const newTask = new Todos({"task":task ,"dueDate": dueDate  ,"owner": ownerId})

        await newTask.save()

        return res.status(200).json(new ApiResponse(200 , newTask ,"Successfully created the task"))
    
})

const deleteTask = asycnHandler(async (req , res)=>{
        const UserId = req.user?._id || req.guest?._id
        const currentUserId = UserId.toString()
        if(!currentUserId){
            throw new ApiError(404 , "You must be logged In")
        }
        const taskId = req.params.id
        
        
        if(!taskId){
            throw new ApiError(401 , "No task found")
        }
        
        const deleteTask = await Todos.findOneAndDelete({_id : taskId ,  owner : currentUserId})

        if(!deleteTask){
            throw new ApiError(401 , "Task not found")
        }

        res.status(200).json(new ApiResponse(200 , {} ,"Successfully deleted the task"))
        
})

const taskComplete = asycnHandler(async(req , res)=>{
    const userId = req.user?._id || req.guest?._id
    const currentUserId = userId.toString()
    if(!currentUserId){
        throw new ApiError(401 , "You must be loggedIn to this")
    }
    const taskId = req.params.id
    if(!taskId){
        throw new ApiError(401 , "No task found")
    }

    const updatedTask = await Todos.findByIdAndUpdate({_id:taskId , owner:currentUserId} , {$set:{completed:true}} , {new:true})

    return res.status(200).json(
        new ApiResponse(200, updatedTask, "Task status updated successfully")
    );
    

})

export {
    createTask,
    deleteTask,
    taskComplete
}