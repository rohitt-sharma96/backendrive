
import { body, validationResult } from 'express-validator'


const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()
        })
    }
    next();
}





export const registerValidator = [
    body("username").trim().notEmpty().withMessage("email is required").isString().withMessage("username string daal"),
    body("email").isEmail().withMessage("email daal"),
    body("password").isLength({ min: 6, max: 12 }).withMessage("between 6 to 12"),

    validate
]

export const loginValidator = [
    body("username")
    .trim()
    .notEmpty().withMessage("email is required")
    .isString().withMessage("username string daal"),

    //client side se only {username and password} le rahe hai

    // body("email")
    // .trim().notEmpty().withMessage("email is required")
    // .isEmail().withMessage("enter valid email"),


    body("password")
    .trim().notEmpty().withMessage("password is required")
    .isLength({ min: 6, max: 12 }).withMessage("Enter password between 6 to 12"),

    validate
]


