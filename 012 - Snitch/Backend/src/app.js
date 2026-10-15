import express from 'express';
import cors from 'cors'

const app = express();


app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

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