import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
      timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    //salt is random string of characters
    const salt = await bcrypt.genSalt(10)
    //we hash the password with this salt
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User