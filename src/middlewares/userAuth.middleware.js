import ApiError from "../utils/ApiError.utils.js";
import jwt from "jsonwebtoken"
import asycnHandler from "../utils/AsycnHandler.utils.js"; 
import ApiResponse from "../utils/ApiResponse.utils.js";
import { User } from "../models/user.models.js";

const verifyUser = asycnHandler(async(req , res , next)=>{
    try {
        console.log("Cookies in request:", req.cookies);

        const token = req.cookies?.accessToken
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id).select("-password -refreshtoken")
    
        req.user = user 
        next()
        
    } catch (error) {
        next()
    }
})

export default verifyUser