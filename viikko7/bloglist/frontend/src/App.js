import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import CommentForm from './components/CommentForm'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import storage from './utils/storage'
import { newNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useParams, useRouteMatch
} from "react-router-dom"
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { lightBlue } from '@material-ui/core/colors'



const App = () => {
  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [comment, setComment] = useState('')
  
  const blogFormRef = React.createRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
    usersService.getAll().then(users =>
      dispatch(initializeUsers(users)))
  }, [dispatch])

  useEffect(() => {
    //muuta tämä reduxiin
    const user = storage.loadUser()
    if (user) {
      dispatch(setUser(user))
    }
  }, [dispatch])

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)


  const notifyWith = (message, type='success') => {
    dispatch(newNotification({message, type}, 5))
  
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      //muuta tämä reduxiin
      //tee userReducer
      storage.saveUser(user)
      dispatch(setUser(user))
      notifyWith(`${user.name} welcome back!`)
      
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      //setBlogs(blogs.concat(newBlog))
      dispatch(addBlog(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const sendComment = async (comment) => {
    //event.preventDefault()
    const id = matchBlog.id
    try {
      const newComment = {"comment" : comment}
      await blogService.comment(newComment, id)
      setComment('')
      notifyWith(`you commented blog id ${id} with comment ${comment}`)
      dispatch(initializeBlogs(blogs.map(b => b.id === id
        ? {...matchBlog, comments: matchBlog.comments.concat(comment)}
        : b
        )))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    
    await blogService.update(likedBlog)
    dispatch(initializeBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b)))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      console.log('blog should be removed')
      await blogService.remove(id)
      dispatch(initializeBlogs(blogs.filter(b => b.id !== id)))
    }
  }

  const handleLogout = () => {
    //tee reducerilla
    dispatch(setUser(null))
    storage.logoutUser()
  }

  const userMatch = useRouteMatch('/users/:id')
  const matchUser = userMatch 
    ? users.find(u => user.id === (userMatch.params.id))
    : null
  const blogMatch = useRouteMatch('/blogs/:id')
  const matchBlog = blogMatch
    ? blogs.find(b => b.id === (blogMatch.params.id))
    : null


  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
        <div>
            
            <TextField
              label='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            
            <TextField
              label='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <Button variant='contained' color='primary' id='login' type='submit'>login</Button>
          </div>
        </form>
      </div>
    )
  }



  const byLikes = (b1, b2) => b2.likes - b1.likes

  const User = () => {
    if(!matchUser) {
      return null
    }
    
    const name = matchUser.name
    return (
      <>
        <h2>{name}</h2>
        <b>added blogs</b>
        <List>
          {matchUser.blogs.map(blog => 
            <ListItem key={blog.id}><ListItemText primary={blog.title} /></ListItem>
          )}
        </List>
      </>
    )
  }

  const BlogPage =() => {
    if(!matchBlog) {
      return null
    }

    return (
      <>
        <h2>{matchBlog.title} {matchBlog.author}</h2>
        <a href={matchBlog.url}>{matchBlog.url}</a>
        <div>{matchBlog.likes} likes <button onClick={() => handleLike(matchBlog.id)}>like</button></div>
        <div>added by {matchBlog.author}</div>
        <h3>comments:</h3>
        <CommentForm 
          setComment = {setComment}
          sendComment = {sendComment}
          id = {matchBlog.id}
        />
        
        <ul>
          {matchBlog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      </>
    )

  }

  const padding = {
    padding: 5
  }

  return (
    <Container>
      <Router>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <h2>blogs</h2>

        <Notification />

        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/blogs/:id">
            <BlogPage />
          </Route>        
          <Route path="/">
            <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>

        
            {blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
                own={user.username===blog.user.username}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}
//kun combineReducers on tehty
//useSelector(state => state.blogs).sort(byLikes).map(blog =>
//oli {blogs.sort(byLikes).map(blog =>

export default App