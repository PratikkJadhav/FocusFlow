import mongoose , {Schema} from "mongoose";

const todoSchema = new Schema({
    task:{
        type:String,
        required:true,
        trim:true
    },
    dueDate:{
        type:Date,
        default:Date.now(),
    },
    completed:{
        type:Boolean,
        default:false,
    },
    owner:{ 
        type:String,
        required:true,
    }

},{timestamps:true})

export const Todos = mongoose.model("Todos" , todoSchema)