const express = require('express')
const authController = require('../controllers/auth.controller')

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description  register a number into DB
 * @access Public
 */
authRouter.post("/register", authController.register );



/**
 * @route POST /api/auth/login
 * @description login a user into DB
 * @access Public
 */

authRouter.post("/login", authController.login);

module.exports = authRouter;