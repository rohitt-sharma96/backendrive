import { Router } from "express";

const authRouter = Router();

import { login, register } from '../controllers/auth.controller.js';
import authValidator from "../validators/auth.validator.js";



/**
 * @route POST /api/auth/register
 * @description register a new user in DB
 * @access Public
 * @body {username, email, password}
 */

authRouter.post('/register', authValidator, register)




/**
 * @route POST /api/auth/login
 * @description login a existing user
 * @access Public
 * @body {username, email, password}
 */

authRouter.post('/login', login)


export default authRouter