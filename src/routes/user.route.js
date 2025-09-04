import {Router} from "express"
import express from "express"
import { loginUser , logoutUser , continueAsGuest , registerUser , generateAccessTokens  } from "../controllers/user.controller.js"
import verifyUser from "../middlewares/userAuth.middleware.js"


const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/continueAsGuest").post(continueAsGuest)
router.route("/logout").post(logoutUser)
router.route("/refreshToken").post(generateAccessTokens )


export default router