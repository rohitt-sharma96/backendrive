const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        unique: [true,"unique username"],
        required: [true, "required username"]
    },
    email:{
        type: String,
        unique: [true, "unique email"],
        required: [true, "required email"]
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    bio: String,
    profileImage:{
        type: String,
        default:"https://ik.imagekit.io/u9fcxeowj/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp?updatedAt=1770800028519" 
    }
},{timestamps: true})


const userModel = mongoose.model('users', userSchema);


module.exports = userModel;