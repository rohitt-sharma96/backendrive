
const postModel = require('../models/post.model')
const likeModel = require('../models/like.model');

const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')

const jwt = require('jsonwebtoken')

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function createPost(req, res) {
    const { caption } = req.body;
    const userId = req.user.id;


    const response = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: 'demo-4'
    });


    const post = await postModel.create({
        caption,
        imgUrl: response.url,
        userId: userId,
    })


    res.status(201).json({
        message: "post created successfully",
        post
    })


}

async function getPost(req, res) {

    const decoded = req.user;
    let userId = decoded.id;

    const posts = await postModel.find({ userId: userId })

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    })


}


async function getPostDetails(req, res) {
    const decoded = req.user;
    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "not found post"
        })
    }

    const isValidUser = post.userId.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "forbidden content"
        })
    }

    return res.status(200).json({
        message: "fetched successfully post details",
        post
    })
}


async function likePost(req, res) {
    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "doesn't exit post"
        })
    }

    const like = await likeModel.create({
        postId: postId,
        user: username
    })

    res.status(200).json({
        message: "post like successfully",
        like
    })

}

async function unLikePost(req, res){
    const postId = req.params.postId;
    const username = req.user.username;

    const isLiked = await likeModel.findOne({
        postId,
        user: username
    })

    if(!isLiked){
        return res.status(400).json({
            message:"tumne like nhi kiya h post ko"
        })
    }

    await likeModel.findByIdAndDelete(isLiked._id)
    res.status(200).json({
        message:"unlike successfully",
    })

}

async function getFeed(req, res) {
    /* Readable Format

    const postsDB = await postModel.find()
                       .populate("userId")
                       .lean();

    const posts = await Promise.all(
                  postsDB.map(async (post) => {

          const isLiked = await likeModel.findOne
                    ({ user: user.username,
                       postId: post._id
                    })

        post.isLiked = Boolean(isLiked)

        return post;
    })
);*/

    const user = req.user;

    const posts = await Promise.all(
        (await postModel.find().populate("userId").lean()) //.sort({_id: -1}) id ke basis pe reverse krta hai

        .map(async (post) => {

//post elem mein user model se user ki info and post model se post ki info sb aa rhi hai. populate ki help se
            const isLiked = await likeModel.findOne({
                user: user.username,
                postId: post._id
            })


            // isLiked post mein create bhi ho raha hai
            post.isLiked = Boolean(isLiked) // !!Boolean

            /*same like this
              const person = {
                              name: "Rohit"
                             };

                            person.age = 22; 
            
            */

            return post;
        }))

    if (!posts) {

        return res.status(404).json({
            message: "posts not found"
        })
    }

    return res.status(200).json({
        message: "successfully fetched all posts",
        posts
    })
}


module.exports = { createPost, getPost, getPostDetails, likePost, unLikePost, getFeed }