import React from 'react'
import {ListItem, ListItemText} from '@material-ui/core'

const Blog = ({ blog }) => {
  

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <ListItemLink href={`/blogs/${blog.id}`}>
      <ListItemText primary={`${blog.title} ${blog.author}`}></ListItemText>
    </ListItemLink>
  )

}


export default Blog