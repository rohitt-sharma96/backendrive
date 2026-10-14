import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre("save", async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password)
}

const userModel = mongoose.model("users", userSchema)
export default userModel;