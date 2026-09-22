const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "required postId"],
    },
    user: {
        type: String,
        required: [true, "required username"]
    },
}, { timestamps: true });

likeSchema.index({ postId: 1, user: 1 }, { unique: true })



const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;