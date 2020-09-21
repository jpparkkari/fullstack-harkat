//const { request } = require("express")

const _ = require('lodash')
const logger = require("./logger")

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (acc, data) => {
    return acc + data.likes
  }
  
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxBlog = blogs.reduce(
    (maxBlog, blog) => ( blog.likes > maxBlog.likes ? blog : maxBlog), blogs[0]
  )
  const result = `{"title": ${maxBlog.title}, "author": ${maxBlog.author}, "likes": ${maxBlog.likes}}`
  
  return result
  //console.log(maxBlog)
  //return maxBlog.likes
}

//4.6 mostBlogs. Gets array of blogs. Returns the author with most blogs and the number of those blogs. Do also tests for this.
const mostBlogs = (blogs) => {
 
  const max = _.chain(blogs).countBy('author').toPairs().max().value()
  
  return { author: max[0], blogs: max[1] }
}

//4.7 mostLikes. Gets array of blogs. Returns the author with most likes. Do also tests for this.
const mostLikes = (blogs) => {
  const group = _.groupBy(blogs, 'author')
  const likeCount = _.reduce(group, (result, value, key) => {
    result[key] = totalLikes(value)
    return result
  }, {})
  const mostLiked = _.find(Object.entries(likeCount).sort((a,b) => b[1]-a[1]))

  return { author: mostLiked[0], likes: mostLiked[1] }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}