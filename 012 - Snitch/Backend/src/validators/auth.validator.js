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



export const registerValidation = [
    body('email')
        .isEmail().withMessage("Fill with proper email").trim(),

    body("password")
        .isLength({ max: 12, min: 6 }).withMessage("Password length must be between 6 to 12 length"),

    body("contact")
        .notEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/) .withMessage("Contact must be a 10 digit number"),

    body("fullname")
        .notEmpty().withMessage("full Name is required")
        .isLength({min:3}).withMessage("Full name must be at least 3 characters long"),

    body("isSeller")
        .isBoolean().withMessage("isSeller is must be a boolean value"),
    validate

]


export const loginValidation = [
    body("email")
        .isEmail().withMessage("Invalid email format").trim(),
    body("password")
        .isLength({max:12, min:6}).withMessage("Password should be at least 6 to 12 characters long")
        .notEmpty().withMessage("Password is required"),

    validate
]