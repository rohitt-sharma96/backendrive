import { Router } from 'express'


const authRouter = Router();
import { register, login } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation} from '../validators/auth.validator.js';


authRouter.post("/register", registerValidation, register)



authRouter.post("/login", loginValidation, login )




export default authRouter