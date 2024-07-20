const express = require('express')
const {routerStudent} = require('./routes/student.router')

const app = express()

app.use(express.json())

app.use(routerStudent)

module.exports.app = app