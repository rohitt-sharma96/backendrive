import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { sendEmail } from '../services/main.service.js'

// import dotenv from 'dotenv'
// dotenv.config();

export const register = async (req, res) => {//no token save bcz email verified by sending Email to user
    
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isAlreadyRegistered) {
        return res.status(409).json({
            message: "already registered with this email/username",
            success: false,
            err: 'user already exists'
        })
    }


    const user = await userModel.create({
        username,
        email,
        password
    })


    await sendEmail({
        to: email,
        subject:"Welcome to Perplexity",
        html:`
            <p> Hi ${username}, </p>
            <p> Thank you for registering at <strong>Perplexity</string>. We're excited to have you on board<br>
            <p> Best regard, <br>The Perplexity Team </p>
            `
    })
    
    
    
    
    
    //deleting password explicitly
    const userWithoutPassword = user.toObject();// object mein convert krte  then remove kr diya password ko
    delete userWithoutPassword.password;




    return res.status(201).json({
        message: "user created successfully",
        user: userWithoutPassword
    })
}

export const login = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "invalid username or email"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "invalid email or password"
        })
    }
    const user2 = user.toObject();// object mein convert krte  then remove kr diya password ko
    delete user2.password;

    const token = jwt.sign({id: user._id, username:user.username}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
    res.cookie("token", token);



    return res.status(200).json({
        message:"loggedIn successfully",
        user2
    })
}