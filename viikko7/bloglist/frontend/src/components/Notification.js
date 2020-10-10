import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {

  const notification = useSelector(state=>state.notification)

  if ( !notification ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }
  

  return <div>
    {(notification.type === 'success' ?
      <Alert severity="success">
        {notification.message}
      </Alert> :
      <Alert severity="error">
        {notification.message}
      </Alert>
    )}    
  </div>
}

export default Notification