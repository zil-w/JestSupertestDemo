const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const mongoose = require('mongoose')
const testApp = supertest(app)//this instantiate a server instance with its internal port for you
const testData = require('./testData')

//testing data
const blogs = testData.blogs
const testBlog = testData.testBlog
const blogNoLike = testData.blogNoLike
const blogNoUrl =  testData.blogNoUrl
const blogNoTitle = testData.blogNoTitle
const blogNoUT = testData.blogNoUT
const rootUser = testData.rootUser
const newUser = testData.newUser

//apparently DB connection is established in testApp instance, so there is no need in establishing DB conn again here

//wipe test DB and populate it with controlled/known data
beforeEach(async () => {
  await Blog.deleteMany({})

  const mongooseBlogObjs = blogs.map(blog => new Blog(blog))
  const promiseBlogObjs = mongooseBlogObjs.map(mBlog => mBlog.save()) //we are not await here
  await Promise.all(promiseBlogObjs)

  await User.deleteMany({})
  const user = new User(rootUser)
  await user.save()
})

//verifying correct number of entries
describe('entries number test', () => {
  test('testing with provided blog list (6)', async () => {
    const response = await testApp.get('/api/blogs')
    expect(response.body.length).toBe(6)
  })
})

//veryifying uniqueness of ids
describe('verifying if blog has an id', () => {
  test('testing presence of ids', async () => {
    const response = await testApp.get('/api/blogs')
    response.body.forEach(element => {
      console.log('is ran')
      expect(element.id).toBeDefined()
    })
  })
})

//verifying blog creation
describe('verifying creating a post', () => {
  test('create a post', async () => {
    await testApp
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await testApp.get('/api/blogs')
    expect(response.body.length).toBe(blogs.length+1)
    const titleList = response.body.map(blog => blog.title)
    expect(titleList).toContain(testBlog.title)
  })
})

//verifying if likes is defaulted to 0 if it's absent in submitted blog
describe('verifying likes default', () => {
  test('verifying defaulting to zero', async () => {
    const res = await testApp //what is actually happening here, are post and send promises?
      .post('/api/blogs')
      .send(blogNoLike)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await testApp.get(`/api/blogs/${res.body.id}`)
    expect(response.body.likes).toBe(0)
  })
})

//verify if server rejection submission without url and/or title
describe('verifying title and url constraint', () => {
  test('verifying mssing title and missing url', async () => {
    await testApp
      .post('/api/blogs')
      .send(blogNoTitle)
      .expect(400)

    await testApp
      .post('/api/blogs')
      .send(blogNoUrl)
      .expect(400)

    await testApp
      .post('/api/blogs')
      .send(blogNoUT)
      .expect(400)
  })
})

//success status code is somehow 200 instead of 202 or 204, is it because the response has an entity body?
describe('verifying delete capability', () => {
  test('try to delete the first element in DB', async () => {
    const blogList = await testApp.get('/api/blogs')
    const IDToDelete = blogList.body[0].id

    await testApp
      .delete(`/api/blogs/${IDToDelete}`)
      .expect(200)

    const updatedBlogList = await testApp.get('/api/blogs')
    const updatedIDList = updatedBlogList.body.map(blog => blog.id)
    expect(updatedIDList).not.toContain(IDToDelete)
  })
})

//test put, this has a clear advantage over rest API client as you don't need to define entity body manually
describe('verifying update capability', () => {
  test('try to update the first element in DB', async () => {
    const blogList = await testApp.get('/api/blogs')

    const IDToUpdate = blogList.body[0].id
    const newTitle = 'Pattern O React'
    const newContent = { ...blogList.body[0], title: newTitle }

    await testApp
      .put(`/api/blogs/${IDToUpdate}`)
      .send(newContent)
      .expect(200)

    const updatedBlogList = await testApp.get('/api/blogs')

    expect(updatedBlogList.body[0].title).toBe(newTitle)
  })
})

describe('adding new users', () => {
  test('is root user saved', async () => {
    const userList = await testApp
      .get('/api/users')
      .expect(200)

    console.log(userList.body)
    
    expect(userList.body[0].username).toBe(rootUser.username)
  })

  test('a single user', async () => {
    //console.log('user model we have is: ', newUser)
    const response = await testApp
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log('response is: ', response)
    expect(response.body.username).toBe(newUser.username)
    expect(response.body.name).toBe(newUser.name)
  })
})

afterAll(() => {
  mongoose.connection.close()
})