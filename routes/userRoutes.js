const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const router = express.Router()

const userModel = require('../database/user')

mongoose.connect(process.env.CLUSTER_ID)

const salt = bcrypt.genSaltSync(10)

// router.get('/login', (req, res) => {
//     res.send("Login Page")
// })

router.post('/register', async (req, res) => {
    const { firstName, lastName, dob, email, phoneNumber, address, password } = req.body
    try {
        const userDoc = await userModel.create({
            firstName,
            lastName,
            dob,
            email,
            phoneNumber,
            address,
            password: bcrypt.hashSync(password, salt),
        })
        res.json(userDoc)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router