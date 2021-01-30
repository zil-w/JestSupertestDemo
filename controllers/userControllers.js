const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//let's try delegating try and catch blocks to the express-async-errors package
userRouter.post('/users', async (request, response) => {
  const userInfo = request.body
  const saltRound = 10 //what does this actually do?
  const hashedPass = await bcrypt.hash(userInfo.password, saltRound)

  const newUser = new User({
    username: userInfo.username,
    name: userInfo.name,
    hashedPass,
    blogs: []
  })

  const responseUser = await newUser.save()
  response.status(201).json(responseUser)
})

userRouter.get('/users', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title:1, author:1, url:1, likes:1 })//the setting directly applies to elements in the array
  response.json(users)
})

module.exports = userRouter