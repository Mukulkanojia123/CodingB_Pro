const express = require('express');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const { User } = require('../model')

const router = express.Router()

router.post('/signup', async (req, res) => {
    res.status(201).json({
        message: 'hello'
    })
    // const { username, password } = req.body
    // const hashpassword = await bycrypt.hash(password, 10);
    // try {
    //     const user = await User.create({ username, password: hashpassword })
    //     res.status(201).json(user);
    // } catch (err) {
    //     console.log("ERROR", err)
    // }
})

router.post('/login', async (res, res) => {
    res.status(201).json({
        message: 'hello'
    })
})