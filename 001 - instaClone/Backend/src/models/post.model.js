const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "required imgUrl"]
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "required userId"]
    }
})


const postModel = mongoose.model("posts",postSchema);

module.exports = postModel;