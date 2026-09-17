import "dotenv/config"

import app from './src/app.js'
import connectDB from './src/config/database.js';

import { test } from "./src/services/mistral.service.js";

test()

connectDB();

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
