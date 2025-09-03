import ApiError from "../utils/ApiError.utils.js";
import jwt from "jsonwebtoken"
import asycnHandler from "../utils/AsycnHandler.utils.js"; 
import ApiResponse from "../utils/ApiResponse.utils.js";
import { User } from "../models/user.models.js";

const verifyUser = asycnHandler(async(req , res , next)=>{
    try {
        console.log("Cookies in request:", req.cookies);

        const token = req.cookies?.accessToken
        
        if(!token){
            throw new ApiError(404 , "Unauthorized Requested")
        }
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id).select("-password -refreshtoken")
    
        if(!user){
            throw new ApiError(404 , "No user Found")
        }
    
        req.user = user 
        next()
    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid access token")
    }
})

export default verifyUser