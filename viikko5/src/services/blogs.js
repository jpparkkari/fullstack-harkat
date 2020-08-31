import axios from 'axios'
const baseUrl = '/api/blogs'



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (blog) => {
  const id = blog.id
  const updatedBlog =
    {
      user: blog.user.id,
      likes: blog.likes +1 ,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

  //const newBlog = { ...blog, likes: blog.likes +1, user: blog.user.id }
  const response = await axios.put(baseUrl+`/${id}`, updatedBlog)
  return response.data
}

const remove = async (blog) => {
  const token = `bearer ${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token}`
  const config = {
    headers: { Authorization: token },
  }
  return await axios.delete(baseUrl+`/${blog.id}`, config)
}

export default { getAll, create, like, remove }