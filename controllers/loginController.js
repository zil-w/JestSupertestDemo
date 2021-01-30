const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const providedInfo = request.body
  const user = await User.findOne({ username:providedInfo.username })
  const authSuccess = (user === null) ? false : await bcrypt.compare(providedInfo.password, user.password)

  if(authSuccess){
    const authUser = { username: user.username, id: user._id }
    const token = jwt.sign(authUser, process.env.SECRET)
    response.json({ username: user.username, name: user.name, token })
  }
  else{
    response.status(401).json({ error: 'invalid username or password' })
  }
})

module.exports = loginRouter