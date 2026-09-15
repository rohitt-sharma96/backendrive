import express from 'express';
import cookieParser from 'cookie-parser'

const app = express();

//middleware
app.use(express.json())// readable in json
app.use(express.urlencoded({ extended: true }));//html to json
//require cookie-parse
app.use(cookieParser());


//Health Check
app.get('/', (req, res) => {
    res.json({ message: 'server is running' })
})




/**
 * Routes
 */
import authRouter from './routes/auth.route.js';

app.use('/api/auth', authRouter);


export default app;