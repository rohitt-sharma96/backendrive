import { Router } from 'express'


const authRouter = Router();
import { register, login, googleCallback } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation } from '../validators/auth.validator.js';
import passport from 'passport'
import { config } from '../config/config.js';


authRouter.post("/register", registerValidation, register)



authRouter.post("/login", loginValidation, login)

authRouter.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] }))


authRouter.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: config.NODE_ENV == "development" ? "http://localhost:5173/login" : "/login"
    }),
    googleCallback

)


export default authRouter