const userModel = require('../models/user.model')//
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function register(req, res) {
    const { username, email, password, bio, profileImage } = req.body;


    const isUser = await userModel.findOne({ $or: [{ email }, { username }] })

    if (isUser) {
        return res.status(409).json({
            message: "user exists"
        })
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })


    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    res.cookie("token", token);


    res.status(200).json({
        message: "registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function login(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({ $or: [{ username }, { email }] }).select("+password")

    if (!user) {
        return res.status(404).json({
            message: "not exist user"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(409).json({
            message: "wrong pass"
        })
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    res.cookie("token", token)

    res.status(200).json({
        message: "successfully login",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function getMe(req, res){
    
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if(!user){
        res.status(404).json({
            message:"user not found"        })
    }

    res.status(200).json({
        message:"user found",

        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage

        }
    })
}




module.exports = { register, login, getMe }