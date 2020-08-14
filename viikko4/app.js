const express = require('express')
require('express-async-errors')
const app = express()
const loginRouter = require('./controllers/login')
//const logger = require('./utils/logger')
const cors = require('cors')
//const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

//const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)
app.use('/api/login', loginRouter)

module.exports = app