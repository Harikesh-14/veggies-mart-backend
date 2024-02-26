const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
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
    companyName: {
        type: String,
        require: true,
    },
    businessAddress: {
        type: String,
        require: true,
    },
    productCategories: [{
        type: String,
        required: true
    }],
    accountHolderName: {
        type: String,
        require: true,
    },
    bankAccountNo: {
        type: Number,
        require: true
    },
    IFSCCode: {
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

const sellerModel = mongoose.model('seller', sellerSchema)

module.exports = sellerModel