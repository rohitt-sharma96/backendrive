import {body, validationResult} from 'express-validator'



const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()//matlab controller pe jao
    }
    //error hai to
    res.status(400).json({
        errors: errors.array()
    })
}


export const registerValidation = [

    body("username").isString().withMessage("username string daal"),
    body("email").isEmail().withMessage("email string dall"),
    body("password").isLength({min: 6, max:12}).withMessage("at least 6 character and less then 12"),

    validate

]