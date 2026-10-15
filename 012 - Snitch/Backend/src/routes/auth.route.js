import { Router } from 'express'


const authRouter = Router();
import { register } from '../controllers/auth.controller.js';
import { registerValidation } from '../validators/auth.validator.js';
import {register} from '../routes/auth.route.js'


authRouter.post("/register", registerValidation, register)





export default authRouter