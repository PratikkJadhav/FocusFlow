import ApiError from "../utils/ApiError.utils";
import jwt from "jsonwebtoken"
import asycnHandler from "../utils/AsycnHandler.utils"; 
import ApiResponse from "../utils/ApiResponse.utils";
import { User } from "../models/user.models";

const verifyUser = asycnHandler(async(req , res , next)=>{
    try {
        const token = req.cookies?.accessToken
        
        if(!token){
            throw new ApiError(404 , "Unauthorized Request")
        }
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken).select("-password -refreshtoken")
    
        if(!user){
            throw new ApiError(404 , "No user Found")
        }
    
        req.user = user 
        next()
    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid access token")
    }
})