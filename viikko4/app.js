const express = require('express')
const app = express()
//const logger = require('./utils/logger')
const cors = require('cors')
//const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

//const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app