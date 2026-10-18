import dotenv from 'dotenv'
dotenv.config()

/*
  WHY Check - Agar dotenv mein ye variable exists nahi karta to server start mat hone do, 
                Ye check nahi lagayenge to Error bahut hi baad mein aayega.
                Lekin es check ki wajah se error pehle hi aayega agar dotenv khali hogi to 
*/

if (!process.env.MONGODB_URI) throw new Error("MONGO_URI is not defined in environment variables")
if (!process.env.JWT_SECRET_KEY) throw new Error("JWT_SECRET_KEY is not defined in environment variables")
if (!process.env.GOOGLE_CLIENT_ID) throw new Error("GOOGLE_CLIENT_ID is not defined in environmental variables")
if (!process.env.GOOGLE_CLIENT_SECRET) throw new Error("GOOGLE_CLIENT_SECRET is not defined in environmental variables")
if (!process.env.IMAGEKIT_PRIVATE_KEY) throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in environmental variables")

export const config = {
    MONGO_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}