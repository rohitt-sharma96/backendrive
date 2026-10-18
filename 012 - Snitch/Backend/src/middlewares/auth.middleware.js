import jwt from 'jsonwebtoken'
import { config } from '../config/config.js';
import userModel from '../models/user.model.js';



export const authenticateSeller = async (req, res, next) => {

    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({
            message: "Invalid Token",
            success: false,
            err: "Token not found"
        })
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
                err: "user not found"
            })
        }

        if (user.role !== "seller") {
            return res.status(403).json({
                message: "Forbidden",
                success: false,
                err: "role not matched"
            })
        }

        req.user = user  //req.user <- ye custom property hai  eg. -> req.modi
        next();
    }
    catch (err) {
        console.error("Error verifying seller token", err)
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}