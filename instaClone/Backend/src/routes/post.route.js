const express = require('express')
const postRouter = express.Router();

const postController = require('../controllers/post.controller')

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const identifyUser = require('../middlewares/auth.middleware')

/**
 *@route POST /api/posts [protected]
 *@description req.body {caption, img-file}
 */
postRouter.post("/", identifyUser, upload.single('image'),   postController.createPost);


/**
 *@route GET /api/posts/ [protected]
 *@description Get all posts
 */

postRouter.get("/",identifyUser, postController.getPost);


/**
 *@route GET /api/posts/details/:postId
 *@description Return a detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */

postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);


/**
 * @route POST/api/posts/like/:postId
 * @description Like a post
 * @access Private
 */

postRouter.post("/like/:postId", identifyUser, postController.likePost);


/**
 * @route GET/api/posts/feed
 * @description Get all post from DB
 * @access Private
 */

postRouter.get("/feed", identifyUser, postController.getFeed);
 


module.exports = postRouter;