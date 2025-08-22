import dotenv  from "dotenv"
import express from "express"
import connectDB from "./db/index.db"
import app from "./app"
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Successfully connnected to port ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log(`MongDB connection Failed , error: ${error}`);
    
})