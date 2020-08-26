import React, { useState } from 'react'
import blogService from '../services/blogs'

//const fullView = true
const Blog = ({ blog }) => {
  const [thisBlog, setBlog] = useState(blog)
  const [fullView, setFullView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewFull = () => (
    <div style={blogStyle}>
      <div>{thisBlog.title} {thisBlog.author} <button onClick={handleView}>hide</button></div>
      <div>{thisBlog.url}</div>
      <div>likes {likes} <button onClick={handleLike}>like</button ></div>
      <div>{thisBlog.user != null ? thisBlog.user.name : ''}</div>
    </div>
  )

  const viewReduced = () => (
    <div style={blogStyle}>
      <div>{thisBlog.title} {thisBlog.author} <button onClick={handleView}>view</button></div>
    </div>
  )

  const handleView = (event) => {
    event.preventDefault()
    setFullView(!fullView)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.like(thisBlog)
    setLikes(newBlog.likes)
    setBlog(newBlog)
  }

  return (
    <>
   {fullView === true ? viewFull() : viewReduced()}
   </>
  )
}

export default Blog
