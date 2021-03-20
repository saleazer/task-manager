const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')  // Middleware
const jwt = require('jsonwebtoken')

// To use the middleware- have to create schema first so we can run methods on it below
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error("Password must be longer than 6 characters.")
            } else if (value.toLowerCase().includes("password")) {
                throw new Error("Invalid password option, try again.")
            }
        }
    },

    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
// 'Methods' are used on the instances of each model
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, "thisismynodeproject")

    this.tokens = this.tokens.concat({token})
    await this.save()

    return token
}



// 'Statics' are methods usable on the model itself
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
       throw new Error("No match returned") 
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Password doesn't match")
    }
    return user
}



// Method to hash password before saving "middleware"
userSchema.pre('save', async function (next) {
    const user = this
    // .isModified Mongoose method to see if field is modified before hashing
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User