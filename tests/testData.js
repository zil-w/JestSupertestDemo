const blogs = [
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

const testBlog = { title: 'big adventure', author: 'mini me', url: 'bigadventure.com', likes: 10 }

const blogNoLike = { title: 'big adventure', author: 'mini me', url: 'bigadventure.com' }

const blogNoUrl = { title: 'big duance', author: 'mini big', likes: 15 }

const blogNoTitle = { author: 'mini big', url: 'done.com', likes: 3 }

const blogNoUT = { author: 'figma', likes:5 }

const blogOne = [{ _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }]

const rootUser = {
  username: 'root',
  name: 'root',
  password: 'flamingo'
}

const newUser = {
  username: 'Go Go',
  name: 'Tamago',
  password: 'sadas!!!#32www'
}

module.exports = { blogs, testBlog, blogNoLike, blogNoTitle, blogNoUrl, blogNoUT, blogOne, rootUser, newUser }