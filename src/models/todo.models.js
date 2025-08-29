import mongoose , {Schema} from "mongoose";

const todoSchema = new Schema({
    task:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        
    }
})

export const Todos = mongoose.model("Todos" , todoSchema)