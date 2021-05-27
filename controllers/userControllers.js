const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/users', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title:1, author:1, url:1, likes:1 })//the setting directly applies to elements in the array
  response.json(users)
})

userRouter.post('/users', async (request, response) => {
  const userInfo = request.body

  if(!userInfo.password || userInfo.password.length < 3){
    return response.status(400).json({ error:'password is required and needs to be at least 3 characters long' })
  }
  if(!userInfo.username || userInfo.username.length < 3){
    return response.status(400).json({ error:'username is required and needs to be at least 3 characters long' })
  }

  const saltRound = 10 //need to look up why this is important
  const hashedPassword = await bcrypt.hash(userInfo.password, saltRound)

  const newUser = new User({
    username: userInfo.username,
    name: userInfo.name,
    hashedPassword,
    blogs: []
  })

  const responseUser = await newUser.save()
  response.status(201).json(responseUser)
})

module.exports = userRouter