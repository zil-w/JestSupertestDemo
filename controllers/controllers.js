const appRouter = require('express').Router() //'/api' endpoint
const Blog = require('../models/blog')

appRouter.get('/blogs', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

  // Blog
  //  .find({})
  //  .then(blogs => {
  //    response.json(blogs)
  //  })
})

appRouter.get('/blogs/:id', async (request, response) => {
  try{
    console.log('received ID', request.params.id)
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  }
  catch(err){
    console.log('error in getting specific ID', err)
    response.status(404).end()
  }

  // Blog
  //  .find({})
  //  .then(blogs => {
  //    response.json(blogs)
  //  })
})

appRouter.post('/blogs', async (request, response) => {
  const blogContent = request.body
  if(blogContent.title && blogContent.url){
    const blog = new Blog(request.body)
    try{
      const result = await blog.save()
      response.status(201).json(result)
    }
    catch(err){
      console.log('error adding new blog', err)
      response.status(400).end()
    }
  }

  else{
    response.status(400).end()
  }
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

appRouter.delete('/blogs/:id', async (request, response) => {
  try{
    console.log('receivedID', request.params.id)
    const res = await Blog.findByIdAndDelete(request.params.id)
    console.log(res)//returns deleted obj if successful, null if failure
    if(res){
      response.json(res).end()
      console.log('okay')
    }
    else{
      response.status(404).end()
      console.log('not okay')
    }
  }
  catch(err){
    console.log(err)
    response.status(400).end()
  }
})

appRouter.put('/blogs/:id', async (req, res) => {
  const newBlog = req.body
  if(newBlog.title && newBlog.url){
    try{
      const updateOptions = { new: true, runValidators: true, context: 'query' }
      const updatedBlog= await Blog.findByIdAndUpdate(req.params.id, newBlog, updateOptions)
      res.json(updatedBlog)
    }
    catch(err){
      res.status(404).end()
    }
  }
  else{
    res.status(400).end()
  }
})

module.exports = appRouter