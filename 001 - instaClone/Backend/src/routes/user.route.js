const express = require('express')

const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const identifyUser = require('../middlewares/auth.middleware');



/**
 * @route POST/api/users/follow/:userId
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUser);

/**
 * @route POST/api/users/unfollow/:userId
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unFollowUser);

module.exports = userRouter;