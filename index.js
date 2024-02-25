const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require ('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Your server is running at http://localhost:${port}`)
})