const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true,
    },
    productCategory: {
        type: String,
        require: true,
    },
    productPrice: {
        type: Number,
        require: true,
    },
    productDescription: {
        type: String,
        require: true,
    },
    productImage: {
        type: String,
        require: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        require: true
    }
}, {
    timestamps: true
})

const productModel = mongoose.model('product', userSchema)

module.exports = productModel