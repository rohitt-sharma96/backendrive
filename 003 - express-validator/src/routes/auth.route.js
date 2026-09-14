import {Router} from 'express'
const authRouter = Router();

import { register } from '../controllers/auth.controller.js';
import { registerValidation } from '../validation/auth.validator.js';

/**
 * @route /api/auth/register
 * @description register a new user
 */
authRouter.post("/register", registerValidation, register);


export default authRouter;