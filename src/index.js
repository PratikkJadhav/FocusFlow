import dotenv  from "dotenv"
import connectDB from "./db/index.db.js"
import app from "./app.js"

dotenv.config();
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Successfully connnected to port ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log(`MongDB connection Failed , error: ${error}`);
    
})