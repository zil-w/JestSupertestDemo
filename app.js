const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogControllers = require('./controllers/blogControllers')
const userControllers = require('./controllers/userControllers')
const loginController = require('./controllers/loginController')
const resetController = require('./controllers/resetController')
const middlewares = require('./utils/middlewares')
const DBConfig = require('./utils/config')
const mongoose = require('mongoose')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const mongoUrl = DBConfig.mongoUrl
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Database connection established'))
  .catch(error => console.log('connection failed:', error))

app.use('/api', loginController)
app.use('/api', blogControllers)
app.use('/api', userControllers)

if(DBConfig.NODE_ENV === 'cypress_test')
  app.use('/api/testing', resetController)

app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)

module.exports = app