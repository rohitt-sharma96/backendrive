import dotenv from 'dotenv'
dotenv.config()

/*
  WHY Check - Agar dotenv mein ye variable exists nahi karta to server start mat hone do, 
                Ye check nahi lagayenge to Error bahut hi baad mein aayega.
                Lekin es check ki wajah se error pehle hi aayega agar dotenv khali hogi to 
*/

if(!process.env.MONGODB_URI) throw new Error("MONGO_URI is not defined in environment variables")
if(!process.env.JWT_SECRET_KEY) throw new Error ("JWT_SECRET_KEY is not defined in environment variables")

export const config = {
    MONGO_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET_KEY,
}