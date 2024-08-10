const express = require('express');
const { sequelize, User, Message } = require("./model/DB")
const app = express();



app.listen(3000, () => {
    console.log("server in listen")
})