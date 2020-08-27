import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  /*const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }*/
  const addBlog = async (blogObject) => {
     
    try {
      const newBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      setMessage(
        `a new blog '${blogObject.title}' by '${blogObject.author}' added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
 
    } catch (exception) {
      /*setErrorMessage('blog cannot be added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      /*setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} />
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form></div>      
  )

  //luo BlogForm.js
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>

  )

  const handleLogout = (event) => {
    event.preventDefault()
    console.log("localstorage cleared")
    window.localStorage.clear()
  }

  const handleLikes = async (likedBlog) => {
    setBlogs(blogs.filter(blog => blog.id !== likedBlog.id).concat(likedBlog).sort((a, b) => {
      return b.likes - a.likes
    }))
  }

  const handleDelete = async (blogToBeDeleted) => {
    const confirmation = window.confirm(`Remove blog ${blogToBeDeleted.title} by ${blogToBeDeleted.author}?`)
    if(!confirmation) return
    await blogService.remove(blogToBeDeleted)
    setBlogs(blogs.filter(blog => blog.id !== blogToBeDeleted.id))

  }

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p> 
      {blogForm()}
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLikes={handleLikes}/>
      )}
    </div>
  )


      //</div><button onClick={window.localStorage.removeItem('loggedBlogappUser')}>logout</button></p>
  return (
    //login form or logged users name and blogs list
    <>
      {user === null ? loginForm() : blogsList() }
    </>
  )
}

export default App