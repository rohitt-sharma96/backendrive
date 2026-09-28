import "dotenv/config"

import app from './src/app.js'
import connectDB from './src/config/database.js';


import {createServer} from "http"
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer = createServer(app)
initSocket(httpServer)



connectDB();

httpServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})
