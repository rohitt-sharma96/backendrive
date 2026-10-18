import { Router } from 'express'
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
import { productValidator } from '../validators/product.validator.js';

import multer from 'multer'
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 //5 MB
    }
})



const productRouter = Router();

productRouter.post("/", authenticateSeller, productValidator, upload.array('images', 7), createProduct)





export default productRouter;
