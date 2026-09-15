
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





const registerValidator = [
    body("username").isString().withMessage("username string daal"),
    body("email").isEmail().withMessage("email daal"),
    body("password").isLength({ min: 6, max: 12 }).withMessage("between 6 to 12"),

    validate
]

export default registerValidator;

