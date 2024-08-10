const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const users = {}
app.get('/', (req, res) => {
    res.status(200).json({ message: "this is get api" })
})
app.post('/signup', (req, res) => {

    const { userName, password } = req.body
    console.log(req.body)
    if (users[userName]) {
        res.status(201).json({ message: 'user already exits' })
    }

    users[userName] = { password, email: '', phone: '' }

    res.status(201).json({ message: 'user is created' })
})


app.post('/login', (req, res) => {
    const { userName, password } = req.body

    const user = users[userName]
    if (!user || user.password !== password) res.status(401).json({ message: 'invalid crediantials' })


    const token = jwt.sign({ userName }, 'iammukul')

    res.status(200).json({ token, user })
})





app.listen(8082, () => {
    console.log("server is listen on port number 8082")
})