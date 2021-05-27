//just for exercise purpose
// eslint-disable-next-line no-unused-vars
const dummyFunction = (_blog) => {
  return 1
}

const totalLikes = (blog) => {
  let initialLike = 0
  blog.forEach(element => initialLike += element.likes)
  return initialLike
}

const favoriteBlog = (blog) => { //is this the best way to do this? could we have used a reduction function?
  if(!blog.length || blog.length === 0){
    return null
  }
  else{
    let i = 0
    let currentMax = blog[0].likes
    let biggestIndex = 0
    for(i; i<blog.length; i++){
      if(blog[i].likes >= currentMax){
        biggestIndex = i
        currentMax = blog[i].likes
      }
    }

    return(blog[biggestIndex])
  }
}

const mostBlogs = (blogs) => {
  //{author1:likes, author2:likes ...}, then loop through keys and check for max value
  //const blogOne = [{ _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }]

  if(!blogs.length || blogs.length === 0){
    return null
  }
  else{
    let pseudoHashMap = {}

    blogs.forEach(element => {
      if(!pseudoHashMap[element.author]){
        pseudoHashMap[element.author] = 1
      }
      else{
        pseudoHashMap[element.author] += 1
      }
    })

    let maxBlogs = 0
    let maxAuthor = 'null'

    for(const [author, blogNum] of Object.entries(pseudoHashMap)){
      if(blogNum > maxBlogs){
        maxBlogs = blogNum
        maxAuthor = author
      }
    }

    return({ author: maxAuthor, blogs: maxBlogs })
  }
}

const mostLikes = (blogs) => {
  //{author1:likes, author2:likes ...}, then loop through keys and check for max value
  //const blogOne = [{ _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }]

  if(!blogs.length || blogs.length === 0){
    return null
  }
  else{
    let pseudoHashMap = {}

    blogs.forEach(element => {
      if(!pseudoHashMap[element.author]){
        pseudoHashMap[element.author] = element.likes
      }
      else{
        pseudoHashMap[element.author] += element.likes
      }
    })

    let maxLikes = 0
    let maxAuthor = 'null'

    for(const [author, likes] of Object.entries(pseudoHashMap)){
      if(likes > maxLikes){
        maxLikes = likes
        maxAuthor = author
      }
    }

    return({ author: maxAuthor, likes: maxLikes })
  }
}

module.exports = { dummyFunction, totalLikes, favoriteBlog, mostBlogs, mostLikes }