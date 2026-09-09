const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

//require routes
const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');
const userRouter = require('./routes/user.route');


//using routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);



module.exports = app;