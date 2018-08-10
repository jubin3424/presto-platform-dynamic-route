const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const mongoose = require('mongoose')
let db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", (callback) => {
  console.log("Connection Succeed")
})

mongoose.connect("mongodb://localhost:27017/presto-dynamic", { useNewUrlParser: true})

// Require API routes
const users = require('./routes/users')
const tokens = require('./routes/token')

// Import API routes
app.use(bodyParser.json())
app.use(users)
app.use(tokens)

module.exports = {
  path: '/api',
  handler: app
}
