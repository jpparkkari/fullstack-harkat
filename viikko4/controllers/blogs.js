const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
//const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  //Note.find({}).then(notes => {
  const blogs = await Blog.find({})
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
/*
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
*/
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())

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