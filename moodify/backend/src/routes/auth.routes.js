const express = require('express')
const authController = require('../controllers/auth.controller');
const identifyUser = require('../middlewares/auth.middleware');

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


/**
 * @route GET /api/auth/get-me
 * @description fetch user details
 * @access Private
 */

authRouter.get("/get-me", identifyUser, authController.getMe);


/**
 * @route POST /api/auth/logout
 * @description user will logout 
 * @access Private
 */
authRouter.post("/logout", identifyUser, authController.logout);

module.exports = authRouter;