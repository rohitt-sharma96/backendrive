const userModel = require('../models/user.model')
const blacklistModel = require('../models/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, email, password } = req.body;

    const isExist = await userModel.findOne({
        $: or[{ username }, { email }]
    })

    if (isExist) {
        return res.status(400).json({
            message: "already registered",
        })
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);

    res.status(200).json({
        message: "registered successfully",
        user
    })

}

const login = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    }).select("+password")

    if (!user) {
        return res.status(409).json({
            message: "user not found"
        })
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(401).json({
            message: "wrong password"
        })
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token);

    res.status(200).json({
        message: "successfully login",
        user: {
            username: user.username,
            email: user.email,
            password: user.password
        }

    })

}

const getMe = async (req, res) =>{
    const {id} = req.user
    console.log(id)


    const user = await userModel.findById(id);

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    res.status(200).json({
        message:"fetched successfully",
        user
    })
}

const logout = async (req, res) => {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    res.clearCookie("token");


    await blacklistModel.create({
        token
    })

    res.status(200).json({
        message:"logout successful"
    })
}

module.exports = { register, login, getMe, logout }