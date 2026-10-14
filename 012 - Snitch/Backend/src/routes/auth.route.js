import { Router } from 'express'


const authRouter = Router();
import { register } from '../controllers/auth.controller.js';
import { registerValidation } from '../validators/auth.validator.js';


authRouter.post("/register", registerValidation, register)





export default authRouter