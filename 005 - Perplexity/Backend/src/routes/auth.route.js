import { Router } from "express";

const authRouter = Router();

import { login, register, verifyEmail, getMe } from '../controllers/auth.controller.js';
import {loginValidator, registerValidator} from "../validators/auth.validator.js";
import identifyUser from "../middlewares/auth.middleware.js";



/**
 * @route POST /api/auth/register
 * @description register a new user in DB
 * @access Public
 * @body {username, email, password}
 */

authRouter.post('/register', registerValidator, register)




/**
 * @route POST /api/auth/login
 * @description login a existing user
 * @access Public
 * @body {username, email, password}
 */

authRouter.post('/login',loginValidator, login)



/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */
authRouter.get('/verify-email', verifyEmail);


/**
 * @route GET /api/auth/get-me
 * @desc Get the authenticated user's information   
 * @access Private
 **/
authRouter.get('/get-me', identifyUser, getMe )

export default authRouter