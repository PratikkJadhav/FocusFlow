import {Router} from "express"
import express from "express"
import { loginUser , logoutUser , continueAsGuest , registerUser , generateAccessTokens , getUserDetails } from "../controllers/user.controller.js"
import verifyUser from "../middlewares/auth.middleware.js"


const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/continueAsGuest").post(continueAsGuest)
router.route("/logout").post(verifyUser , logoutUser)
router.route("/refreshToken").post(generateAccessTokens )


export default router