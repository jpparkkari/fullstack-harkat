import React from 'react'
import { connect } from 'react-redux'

const Notifications = (props) => {
  //const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (props.notification) {
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  }
  else return (<></>)
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const Notification = connect(mapStateToProps)(Notifications)
export default Notification