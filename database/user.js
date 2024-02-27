const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    dob: {
        type: Date,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
        unique: true
    },
    country: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    upiId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
}, {
    timestamps: true
})  



const userModel = mongoose.model('user', userSchema)

module.exports = userModel