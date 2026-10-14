import mongoose from 'mongoose'
import {config} from './config.js'


export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("DB is connected to server")
    }
    catch (err) {
        console.error("Error at DB", err)
        throw new Error(err)
    }

}
