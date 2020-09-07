import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    //<div className="error">
    <div className={type}>
      {message}
    </div>
  )
}

export default Notification