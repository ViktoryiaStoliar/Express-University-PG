const express = require('express')
const bodyParser = require('body-parser')
const route = require('../src/controller/user.controller')

const app = express()
app.use(bodyParser.json())
app.use('/user', route)
app.use((error, req, res, next) => res.send(error.message))


module.exports = app