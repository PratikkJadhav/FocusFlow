import mongoose , {Schema} from "mongoose";

const todoSchema = new Schema({
    task:{
        type:String,
        required:true,
    }
})

export const Todos = mongoose.model("Todos" , todoSchema)