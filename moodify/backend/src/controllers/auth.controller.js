const userModel = require('../models/user.model')
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
    })

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

module.exports = { register, login }