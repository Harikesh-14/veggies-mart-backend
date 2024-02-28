const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const userModel = require("../database/user");

mongoose.connect(process.env.CLUSTER_ID);

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY;

router.get("/", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json(user);
  });
});

router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    email,
    phoneNumber,
    country,
    state,
    address,
    upiId,
    password,
  } = req.body;
  try {
    const userDoc = await userModel.create({
      firstName,
      lastName,
      dob,
      email,
      phoneNumber,
      country,
      state,
      address,
      upiId,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await userModel.findOne({ email: username });

    if (!userDoc) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);

    if (isPasswordValid) {
      const tokenPayload = {
        username,
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        dob: userDoc.dob,
        country: userDoc.country,
        state: userDoc.state,
        address: userDoc.address,
        phoneNumber: userDoc.phoneNumber,
        upiId: userDoc.upiId,
        id: userDoc._id,
      };

      jwt.sign(tokenPayload, secret, {}, (err, token) => {
        if (err) {
          return res.status(401).json({ error: "Internal Server Error" });
        }

        res.cookie("token", token, { httpOnly: true, secure: true }).json({
          id: userDoc._id,
          username,
          firstName: userDoc.firstName,
          lastName: userDoc.lastName,
          dob: userDoc.dob,
          country: userDoc.country,
          state: userDoc.state,
          address: userDoc.address,
          phoneNumber: userDoc.phoneNumber,
          upiId: userDoc.upiId,
        });
      });
    } else {
      return res.status(401).json({ error: "Invalid Credential" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "").json({ message: "You have been logged out" });
});

module.exports = router;
