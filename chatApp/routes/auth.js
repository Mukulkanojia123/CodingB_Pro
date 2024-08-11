const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../model/user')

const router = express.Router()

router.get('/hello', (req, res) => {
    res.send('Hello');
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log(typeof (password))
    const hashpassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, password: hashpassword });
        res.status(201).json(user);
    } catch (err) {
        console.log("ERROR", err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = User.findOne({ where: username })
    if (user && (await bycrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id, password: user.password }, 'secret')
        res.status(200).json({ token: token })
    } else {
        res.status(404).json({
            message: 'invalid crediatial'
        })
    }

})

module.exports = router;