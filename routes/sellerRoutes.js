const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

const sellerModel = require('../database/seller')

mongoose.connect(process.env.CLUSTER_ID)

const salt = bcrypt.genSaltSync(10)
const secret = process.env.SECRET_KEY

router.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        dob,
        email,
        phoneNumber,
        country,
        state,
        companyName,
        businessAddress,
        productCategories,
        bankAccountNo,
        IFSCCode,
        accountHolderName,
        password
    } = req.body;

    try {
        const sellerDoc = await sellerModel.create({
            firstName,
            lastName,
            dob,
            email,
            phoneNumber,
            country,
            state,
            companyName,
            businessAddress,
            productCategories,
            bankAccountNo,
            IFSCCode,
            accountHolderName,
            password: bcrypt.hashSync(password, salt)
        })
        res.json(sellerDoc)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const sellerDoc = await sellerModel.findOne({ email: username })

        if (!sellerDoc) {
            return res.status(400).json({ error: "Seller not found" })
        }

        const isPasswordValid = bcrypt.compareSync(password, sellerDoc.password)

        if (isPasswordValid) {
            const tokenPayload = {
                username,
                firstName: sellerDoc.firstName,
                lastName: sellerDoc.lastName,
                dob: sellerDoc.dob,
                phoneNumber: sellerDoc.phoneNumber,
                country: sellerDoc.country,
                state: sellerDoc.state,
                companyName: sellerDoc.companyName,
                businessAddress: sellerDoc.businessAddress,
                productCategories: sellerDoc.productCategories,
                bankAccountNo: sellerDoc.bankAccountNo,
                IFSCCode: sellerDoc.IFSCCode,
                accountHolderName: sellerDoc.accountHolderName,
                id: sellerDoc._id,
            }

            jwt.sign(tokenPayload, secret, {}, (err, token) => {
                if (err) {
                    return res.status(401).json({ error: "Internal Server Error" })
                }

                res.cookie('token', token, { httpOnly: true, secure: true }).json({
                    id: sellerDoc._id,
                    username,
                    firstName: sellerDoc.firstName,
                    lastName: sellerDoc.lastName,
                    dob: sellerDoc.dob,
                    phoneNumber: sellerDoc.phoneNumber,
                    country: sellerDoc.country,
                    state: sellerDoc.state,
                    companyName: sellerDoc.companyName,
                    businessAddress: sellerDoc.businessAddress,
                    productCategories: sellerDoc.productCategories,
                    bankAccountNo: sellerDoc.bankAccountNo,
                    IFSCCode: sellerDoc.IFSCCode,
                    accountHolderName: sellerDoc.accountHolderName,
                })
            })
        } else {
            return res.status(401).json({ error: "Invalid Credential" })
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('token', '').json({message: "You have been logged out"})
})

module.exports = router