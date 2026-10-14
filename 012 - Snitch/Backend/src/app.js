import express from 'express';

const app = express();



//Health Check
app.get("/health", (req, res)=>{
    req.status(200).json({
        message:"Health is fine!"
    })
})


//ROUTER
import authRouter from './routes/auth.route.js';

app.use("/api/auth", authRouter)

export default app;