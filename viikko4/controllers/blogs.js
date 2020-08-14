const blogsRouter = require('express').Router()
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

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url) {
    response.status(400).end()
    return
  }

  const user = await User.findOne()//findById(decodedToken.id)
  logger.info(user)

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