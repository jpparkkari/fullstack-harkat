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
  console.log(result)
  return result
  //console.log(maxBlog)
  //return maxBlog.likes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}