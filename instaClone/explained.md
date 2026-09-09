```js

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
        (await postModel.find().populate("userId").lean())

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


```