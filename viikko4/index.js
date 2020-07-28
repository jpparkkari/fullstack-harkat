const http = require('http')
const express = require('express')
const app = express()
const logger = require('./utils/logger')
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

//const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})