import {body, validationResult} from 'express-validator'


const validate = (req,res, next) =>{
    const errors = validationResult(req)


    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.array()
        })
    }

    next();

}


export const productValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
    body("priceCurrency").notEmpty().withMessage("Price currency is required"),

    validate
]