const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
//const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  //Note.find({}).then(notes => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
  //})
})
/*
blogsRouter.get('', (request, response) => {

  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})*/
/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  //const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())


})

blogsRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
    
})
/*
blogsRouter.post('', (request, response) => {
  const blog = new Blog(request.body)
  
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/
module.exports = blogsRouter