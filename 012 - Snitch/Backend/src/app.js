import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import { config } from './config/config.js';
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

const app = express();



app.use(express.json())
app.use(morgan("dev")) //Logger
app.use(passport.initialize())


//Health Check
app.get("/health", (req, res) => {
    req.status(200).json({
        message: "Health is fine!"
    })
})

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}, (_, __, profile, done) =>{
    return done(null, profile);
}
))




//ROUTER
import authRouter from './routes/auth.route.js';

app.use("/api/auth", authRouter)

export default app;