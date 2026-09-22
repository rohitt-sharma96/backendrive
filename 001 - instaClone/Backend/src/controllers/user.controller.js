const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUser(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;


    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }
    
    const isFolloweeExists = await userModel.findOne({username: followeeUsername})
    if(!isFolloweeExists){
        return res.status(409).json({
            message:`The user with name ${followeeUsername} not exists`
        })
    }

    const isFollowing = await followModel.findOne({ follower: followerUsername, followee: followeeUsername });
    if (isFollowing) {
        return res.status(200).json({
            message: `you already following ${followeeUsername}`,
            follow: 'Already Following'
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })


}

async function unFollowUser(req, res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isFollowing._id);
    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })
}

module.exports = { followUser, unFollowUser };