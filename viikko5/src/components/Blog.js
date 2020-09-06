import React, { useState } from 'react'
//import blogService from '../services/blogs'
import PropTypes from 'prop-types'

//const fullView = true
const Blog = ({ blog, handleDelete, handleLikes }) => {
  //const [blog, setBlog] = useState(blog)
  const [fullView, setFullView] = useState(false)
  //const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewFull = () => (
    <div style={blogStyle} className="togglableContent">
      <div>{blog.title} {blog.author} <button onClick={handleView}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button id="likeButton" onClick={handleLike}>like</button ></div>
      <div>{blog.user !== null ? blog.user.name : ''}</div>
      <div><button onClick={handleRemove}>remove</button></div>
    </div>
  )

  const viewReduced = () => (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author} <button className="viewButton" onClick={handleView}>view</button></div>
    </div>
  )

  const handleView = (event) => {
    event.preventDefault()
    setFullView(!fullView)
  }

  const handleLike = (event) => {
    event.preventDefault()

    handleLikes(blog)
    /*const newBlog = await blogService.like(thisBlog)
    setLikes(newBlog.likes)
    setBlog(newBlog)
    handleLikes(newBlog) */
  }

  const handleRemove = (event) => {
    event.preventDefault()
    handleDelete(blog)
  }

  return (
    <>
      {fullView === true ? viewFull() : viewReduced()}
    </>
  )
}

Blog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleLikes: PropTypes.func.isRequired
}

export default Blog
