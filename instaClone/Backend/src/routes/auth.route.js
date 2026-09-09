const express = require('express')

const authRouter = express.Router();
const authController = require('../controllers/auth.controller')
const identifyUser = require('../middlewares/auth.middleware');



/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.register );


/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login", authController.login)


/**
 * @route GET /api/auth/get-me
 * @description Get the currently logged in user
 * @access Private
 */
authRouter.get("/get-me",identifyUser, authController.getMe);







module.exports = authRouter;


