import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

const userToken = (user, res) =>{

    const token = jwt.sign({id: user._id}, config.JWT_SECRET )

}





export const register = async (req, res) => {

    const { email, fullname, contact } = req.body;

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
            fullname
        })
    }
    catch (err) {
        console.error(err)
        return res.status(400).json({ message: "server error" })
    }


}