import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username should be unique']
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email should be unique']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
},
    { timestamps: true })

//explanation of these middleware are at lin 49

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10)

})


userSchema.methods.comparePassword = async function (userPassword) {
    return bcrypt.compare(userPassword, this.password)
}



/*
 const user = await userModel.findOne({email})
 user.comparePassword('plainTextPassword) <-- Ye user ke andar method rehta hai
 */


const userModel = mongoose.model('users', userSchema);

export default userModel;









/* userSchema.pre('save', async function (next){

// (password change nhi hua turant exit)
//     if(!this.isModified('password')) return next();    -> check kya password filed nayi/changed hai 
                                                             // agar password modified hoga to false kr dega and ye wala nahi chalega 
                                                             // and niche wali line chalegi hash krne wali


                                                             //agar password modifed nhi hoga to true kr dega to next() step pe jaega

//     this.password = await bcrypt.hash(this.password, 10)
//     next();
// }) 



// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// }
*/
