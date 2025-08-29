import mongoose , {model, Schema} from "mongoose";

const guestSchema = new Schema({

},{timestamps:true})
export const Guest = mongoose.model("Guest" , guestSchema)