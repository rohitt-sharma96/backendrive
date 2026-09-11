const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username should be unique"],
        required: [true, "username required"]
    },
    email: {
        type: String,
        unique: [true, "email should be unique"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        require: ["password is required"],
        select: false
    }
}, { timestamps: true })


const userModel = mongoose.model("users", userSchema);


module.exports = userModel;