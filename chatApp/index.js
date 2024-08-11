const express = require('express');
const http = require('http')
const socketIo = require('socket.io')
const { sequelize, User, Message } = require("./model/DB")
const auth = require('./routes/auth')
const jwt = require('jsonwebtoken')
const app = express();
const server = http.createServer(app)
const io = socketIo(server)


app.use(express.json());
app.use(express.static("public"));
app.use("/auth", auth);

// save users informations
io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        const payload = jwt.verify(token, 'secret');  // verify user
        socket.user = User.findByPk(payload.id);     // find the user using in id in payload put on socket.user
        next();
    } catch (err) {
        next(new Error('Authentication error'))
    }
})

// this is trigger when any one connected to server 
io.on('connection', (socket) => {
    console.log(`user ${socket.user.username} connected`)

    socket.on(async (text) => {
        const message = await Message.create({ text, UserId: socket.user.id })    // save message
        io.emit('message', { text: message.text, user: socket.user.username })   // send
    })
})

server.listen(3000, () => {
    console.log("server in listen")
})