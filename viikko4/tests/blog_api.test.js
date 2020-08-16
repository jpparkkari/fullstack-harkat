const mongoose = require('mongoose')
const supertest = require('supertest')
//const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const { response } = require('express')
//const { response } = require('express')
const blogs = [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

let token = ''

beforeEach(async () => {

  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
  logger.info('blogs initialized')
  const user = { username: 'Test_user', password: 'password' }
  //token = await(await api.post('/api/login').send(user)).body.token
  const response = await api
    .post('/api/login')
    .send(user)
  token = response.body.token
})

test('there are right amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.length)
})

test('blogs return id field', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blogs can be added', async () => {

  
  const newBlog = {
    title: 'test',
    author: 'tester',
    url: 'www',
    likes: 1
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')

  //const contents = blogsAtEnd.map(r => r.content)
  
  expect(blogsAtEnd.body).toHaveLength(blogs.length +1)
  //console.info('number of records ', Object.keys(blogs).length)
  //console.info('number of blogs at the end ', Object.keys(blogsAtEnd.body).length)  
})

test('likes is set to 0 if not specified', async () => {
  const newBlog = {
    title: 'liketest',
    author: 'liketester',
    url: 'www'
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body.likes).toEqual(0)
})

test('no author or title returns 400 Bad Request', async () => {
  const newBlog = {
    
    author: 'liketester',
    url: 'www'
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)
})

test('blogs can be removed', async () => {
  const newBlog = {
    title: 'removetest',
    author: 'removetester',
    url: 'www',
    likes: 0
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const id = savedBlog.body.id

  await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body).toHaveLength(blogs.length)
})

test('wrong token gives 401 unauthorized', async () => {
  const newBlog = {
    
    title: 'wrong token',
    author: 'tester',
    url: 'www',
    likes: '0'
  }

  const savedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer false${token}`)
    .expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})