import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'


const app = express();

//middleware
app.use(express.json())// readable in json
app.use(express.urlencoded({ extended: true }));//html to json
app.use(cookieParser());
app.use(morgan("dev"))

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

//Health Check
app.get('/', (req, res) => {
    res.json({ message: 'server is running' })
})


/**
 * Routes
 */
import authRouter from './routes/auth.route.js';
import chatRouter from './routes/chat.route.js';

app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);


export default app;