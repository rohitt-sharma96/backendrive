import userModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { sendEmail } from '../services/mail.service.js'



/**
 * @route POST /api/auth/register
 * @description register a new user in DB
 * @access Public
 * @body {username, email, password}
 */
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

    const userVerificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY)

    await sendEmail({
        to: email,
        subject: "welcome to perplexity",
        html: `
            <p> hi ${username}, </p>
            <p> thank you for registering at <strong>perplexity</string>. we're excited to have you on board<br>
            <p>Please verify your email address by clicking the link below:</P>
            <a href="http://localhost:3000/api/auth/verify-email?token=${userVerificationToken}">Verify Email</a>
            <p>If you did not create an account, ignore this email</p>
            <p> best regard, <br>the perplexity team </p>
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



/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */
export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    let decoded;

    try {

        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await userModel.findOne({ email: decoded.email })

        if (!user) {
            return res.status(400).json({
                message: "invalid token",
                success: false,
                err: "user not found"
            })
        }


        user.isVerified = true;
        await user.save();



        const html =
            `   <h1>Email Verified Successfully </h1>
            <p>Your email has been verified. You can now log in to your account.  </p>
            <a href="http://localhost:3000/login">Go to login </a>
        `

        return res.send(html)
    }
    catch (err) {
        return res.status(400).json({
            message: 'Invalid or expired token',
            success: false,
            err: err.message
        })
    }
}


/**
 * @route POST /api/auth/login
 * @description login a existing user
 * @access Public
 * @body {username, password}
 */
export const login = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "invalid username or email",
            success: false,
            err: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "invalid email or password",
            success: false,
            err: "password incorrect"
        })
    }

    if (!user.isVerified) {
        return res.status(400).json({
            message: 'Verify your email',
            success: false,
            err: 'Email not verified'
        })
    }


    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
    res.cookie("token", token);



    return res.status(200).json({
        message: "loggedIn successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,

        }

    })

    
    
}


export const getMe = async(req, res) =>{
    /*Old const id = req.user.id
          const username = req.user.username 
    */

    const {id, username}  = req.user;

    const user = await userModel.findById(id)

    if(!user){
        return res.status(404).json({
            message:'user not found',
            success: false,
            err: 'user not found'
        })
    }


    return res.status(200).json({
        message:'user fetched successfully',
        success: true,
        user
    })
}