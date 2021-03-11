const Blog = require('../models/blog')
const User = require('../models/user')
const resetRouter = require('express').Router()

resetRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = resetRouter