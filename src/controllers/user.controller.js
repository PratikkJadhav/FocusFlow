import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";
import { Guest } from "../models/guest.models.js";
import asycnHandler from "../utils/AsycnHandler.utils.js";

const generateTokens = async(userID) =>{
    try {
        const user = await User.findById(userID)
        const accessToken = user.accessTokenGenerator()
        const refreshToken = user.refreshTokenGenerator()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken , refreshToken}

    } catch (error) {
        throw new ApiError(500 , "something went wrong while generating tokens")
    }
}

const getUserDetails = asycnHandler( async (req , res)=>{

    //get user details , if they provide email and password then register and if they continue as guest then continue as guest
    const {email , password} = req.body

    if(email && !password){
        registerUser(req , res)
    }

    if(!email){
        continueAsGuest(req , res);
    }
})
const continueAsGuest = asycnHandler (async (req , res)=>{
    //get guestID
    //add to db

    const guest = await Guest.create({})

    return res.status(200).json({success:true , guest_ID: guest._id , message: "Guest login succesfull"})
})
const registerUser = asycnHandler( async (req , res)=>{
    /*
        Get user details from frontend
        check if user exists or not 
        if email is empty then continue as guest and in that case i have to save all the todos in cookies
        create user object in db
        remove password field in response (js can't access it)
        check for user creation 
        return res
    */

        
        const {email , password} = req.body
        const alreadyRegistered = await User.findOne({email})
        if(alreadyRegistered){
            throw new ApiError(404 , "email already registered , try another email")
        }

        const user = await User.create({
            email ,
            password
        })

        const createdUser = User.findById(user._id).select("-password -refreshToken")

        if(!createdUser){
            throw new ApiError(404 , "Something went wrong while registering user")
        }

        return res.status(201).json(
            new ApiResponse(202 , createdUser , "Successfully created user")
        )
})

const loginUser = asycnHandler(async (req , res)=>{
    //get data from user
    //check if email is correct , password is correct
    //refreshToken is correct
    //send cookie

    const {email , password} = req.body;
    if(!email || !password){
        throw new ApiError(404 , "All fields are required")
    }


    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404 , "No email found")
    }

    const correctPassword = await user.isPasswordCorrect(password)
    if(!correctPassword){
        throw new ApiError(404 , "Password is incorrect")
    }

    const {accessToken , refreshToken} = await generateTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("AccessToken" ,accessToken , options).cookie("RefreshToken" , refreshToken , options).json(new ApiResponse(200 , {user:loginUser , accessToken , refreshToken} , "User logged in Succesfully"))

})

const logoutUser = asycnHandler(async (req , res)=>{
    await User.findByIdAndUpdate(req.user._id , {$unset:{refreshToken:1}},{new:true})

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("AccessToken", options).clearCookie("RefreshToken" , options).json(new ApiResponse(200 , "User loggedOut Succesfully"))

})
