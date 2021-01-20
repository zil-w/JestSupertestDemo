const express = require('express')
const app = express()
const cors = require('cors')
const controllers = require('./controllers/controllers')
const DBConfig = require('./utils/config')
const mongoose = require('mongoose')

app.use(cors())
//app.use(express.static)
app.use(express.json())

const mongoUrl = DBConfig.mongoUrl
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Database connection established'))
  .catch(error => console.log('connection failed:', error))


app.use('/api', controllers)

module.exports = app