import productModel from '../models/product.model.js'
import { uploadFile } from '../services/storage.service.js';

export const createProduct = async (req, res) => {
    const { title, description, priceAmount, priceCurrency } = req.body;
    // images are coming in = req.files 
    //Images we getting in Array form
    const seller = req.user; //from middleware


    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))

    const product = await productModel.create({
        title,
        description,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id
    })

    res.status(201).json({
        message: "product created successfully",
        success: true,
        product
    })
}