import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import mongoose from "mongoose";
import asycnHandler from "../utils/AsycnHandler.utils.js";
import { Guest } from "../models/guest.models.js";

const verifyGuest = asycnHandler(async(req , res , next)=>{
    try {
        const guestId = req.cookies?.guestId
        if (!guestId) {
            return next();
        }
        const guest = await Guest.findById(guestId)
        console.log(guest);
        
        if(!guest){
            return next()
        }
        req.guest = guest
        return next()
    } catch (error) {
        next()
    }
})

export default verifyGuest