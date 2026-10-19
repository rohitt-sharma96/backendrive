import { Router } from 'express'
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct, getSellerProduct } from '../controllers/product.controller.js';
import { productValidator } from '../validators/product.validator.js';

import multer from 'multer'
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 //5 MB
    }
})



const productRouter = Router();

/**
 * @route POST /api/products/
 * @desc create a new product
 * @access Private(Seller only)
 */
productRouter.post("/", authenticateSeller, upload.array('images', 7), productValidator, createProduct)

/**
 * @route GET /api/products/seller
 * @desc Get all products (created by you only)
 * @access Private
 */

productRouter.get("/seller", authenticateSeller, getSellerProduct)


export default productRouter;
