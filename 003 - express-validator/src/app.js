import express from 'express'
import dotenv from 'dotenv'
dotenv.config(); 

import handleError from './middlewares/error.middleware.js';

const app = express();
app.use(express.json())



import authRouter from './routes/auth.route.js';

app.use("/api/auth", authRouter)


//rule sbse last mein use
app.use(handleError);

export default app;