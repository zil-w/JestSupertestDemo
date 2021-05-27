//for exercise puprose
const functionPath = '../utils/list_helper'

const dummyFunction = require(functionPath).dummyFunction
const totalLikes = require(functionPath).totalLikes
const favoriteBlog = require(functionPath).favoriteBlog
const mostBlogs = require(functionPath).mostBlogs
const mostLikes = require(functionPath).mostLikes
const testData = require('./testData')

const blogs = testData.blogs
const blogOne = testData.blogOne
//testing helper functions in utils

describe('dummy test case', () => {
  test('first test case', () => {
    const result = dummyFunction(blogs)
    expect(result).toBe(1)
  } )
})

describe('total likes test:', () => {
  test('testing with zero blogpost', () => {
    expect(totalLikes([])).toBe(0)
  })
  test('testing with one blogpost', () => {
    expect(totalLikes(blogOne)).toBe(7)
  })
  test('testing with many blogpost', () => {
    expect(totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog test:', () => {
  test('testing with zero blogpost', () => {
    expect(favoriteBlog([])).toEqual(null)
  })
  test('testing with one blogpost', () => {
    const expectedResult = { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }
    expect(favoriteBlog(blogOne)).toEqual(expectedResult)
  })
  test('testing with many blogpost', () => {
    const expectedResult = { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }
    expect(favoriteBlog(blogs)).toEqual(expectedResult)
  })
})

describe('max blog test:', () => {
  test('testing with zero blogpost', () => {
    expect(mostBlogs([])).toEqual(null)
  })
  test('testing with one blogpost', () => {
    const expectedResult = { author: 'Michael Chan', blogs:1 }
    expect(mostBlogs(blogOne)).toEqual(expectedResult)
  })
  test('testing with many blogpost', () => {
    const expectedResult = { author: 'Robert C. Martin', blogs: 3 }
    expect(mostBlogs(blogs)).toEqual(expectedResult)
  })
})

describe('most likes test:', () => {
  test('testing with zero blogpost', () => {
    expect(mostLikes([])).toEqual(null)
  })
  test('testing with one blogpost', () => {
    const expectedResult = { author: 'Michael Chan', likes: 7 }
    expect(mostLikes(blogOne)).toEqual(expectedResult)
  })
  test('testing with many blogpost', () => {
    const expectedResult = { author: 'Edsger W. Dijkstra', likes: 17 }
    expect(mostLikes(blogs)).toEqual(expectedResult)
  })
})