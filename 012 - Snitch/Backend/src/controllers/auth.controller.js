import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
import bcrypt from 'bcryptjs'

export const sendTokenResponse = async (user, res, message) => {

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token)

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })

}





export const register = async (req, res) => {

    const { email, fullname, contact, password, isSeller } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })
        if (existingUser) return res.status(400).json({ message: "User with email or contact already exists" })

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        })


        await sendTokenResponse(user, res, "user registered successfully")
    }
    catch (err) {
        console.error(err)
        return res.status(400).json({ message: "server error" })
    }


}


export const login = async (req, res) => {
    const { email, password } = req.body;


    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "user not found with this email",
            success: false,
            err: "user not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid Credentials",
            success: false,
            err: "Incorrect Password",
        })
    }

    await sendTokenResponse(user, res, "user LoggedIn successfully")


}

export const googleCallback = async(req, res)=>{
    
    console.log(req.user);
    res.redirect("http://localhost:5173/")
}