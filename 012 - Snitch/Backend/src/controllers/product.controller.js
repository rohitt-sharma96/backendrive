import productModel from '../models/product.model.js'
import { uploadFile } from '../services/storage.service.js';

export const createProduct = async (req, res) => {
    const { title, description, priceAmount, priceCurrency } = req.body;
    // the data are coming in formData  <--  VVI
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



export const getSellerProduct = async (req, res) =>{
    const seller = req.user;

    const products = await productModel.find({seller: seller._id})

    if(!products){
        return res.status(404).json({
            message:"products not found",
            success: false,
            err:"You have not created any products yet."
        })
    }

    res.status(200).json({
        message:"Products fetched successfully",
        success:true,
        products
    })
}