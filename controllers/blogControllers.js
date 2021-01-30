const blogRouter = require('express').Router() //'/api' endpoint
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/blogs', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1, id: 1 })
  response.json(blogs)
})

blogRouter.get('/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog === null){ //as long as the provided ID can be converted into an object ID, mongoose just returns null with 200 instead of a 404
    return response.status(404).json({ error:'entry not found' })
  }
  response.json(blog)
})

blogRouter.post('/blogs', async (request, response) => {
  const getToken = request => { //helper func to get token from the the authorization header in request
    const authField = request.get('authorization')
    if(authField && authField.toLowerCase().startsWith('bearer '))
      return authField.substring(7)
    else
      return null
  }

  const blogContent = request.body

  if(!blogContent.title || !blogContent.url){
    return response.status(400).json({ error: 'blog title or/and url are missing' }) //okay if we end the response here, middlewares will attempt to set header and results in an error
  }

  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken){
    return response.status(400).json({ error: 'invalid token' })
  }

  const poster = await User.findById(decodedToken.id)//submit blog and add the entry's id to its associated user
  const newBlog = { ...blogContent, user: poster.id }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()

  poster.blogs = poster.blogs.concat(savedBlog._id)
  await poster.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/blogs/:id', async (request, response) => {
  const res = await Blog.findByIdAndDelete(request.params.id) //returns deleted obj if successful, null if failure

  if(res){
    response.status(200).json(res)
    console.log('okay')
  }
  else{
    return response.status(404).json({ error:'entry not found' })//without a json here, it seems like the server just hangs here forever?
  }
})

blogRouter.put('/blogs/:id', async (req, res) => {
  const newBlog = req.body
  if(newBlog.title && newBlog.url){//this just checks if the request has the necessary fields
    const updateOptions = { new: true, runValidators: true, context: 'query' }
    const updatedBlog= await Blog.findByIdAndUpdate(req.params.id, newBlog, updateOptions)
    if(updatedBlog === null){
      return res.status(404).json({ error:'entry not found' })
    }
    res.json(updatedBlog)
  }
  else{
    return res.status(400).json({ error:'missing title and/or url in request' })
  }
})

module.exports = blogRouter