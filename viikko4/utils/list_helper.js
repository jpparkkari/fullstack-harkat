const dummy = (blogs) => {
  return 1
}





const totalLikes = (blogs) => {
  const reducer = (acc, data) => {
    return acc + data.likes
  }
  
  return blogs.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}