import React, { useState } from 'react'


//const fullView = true
const Blog = ({ blog }) => {
  const [fullView, setFullView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewFull = () => (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author} <button onClick={handleView}>hide</button></div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button>like</button ></div>
      <div>{blog.user != null ? blog.user.name : ''}</div>
    </div>
  )

  const viewReduced = () => (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author} <button onClick={handleView}>view</button></div>
    </div>
  )

  const handleView = (event) => {
    event.preventDefault()
    setFullView(!fullView)
  }

  return (
    <>
   {fullView === true ? viewFull() : viewReduced()}
   </>
  )
}

export default Blog
