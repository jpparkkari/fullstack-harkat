const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

/*export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}*/

export const clearNotification = (id, time) => {
  return dispatch => {
    dispatch ({
      type: 'SET_NOTIFICATION',
      notification: ''
    })
  }
}


let id
export const notificationChange = (notification, time) => {
  if (id) {
    clearTimeout(id)
  }
  return async dispatch => {
    dispatch ({
      type: 'SET_NOTIFICATION',
      notification,
    })
    id = setTimeout(()=>{
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: ''
      })
    }, time*1000)
  }
}

export default notificationReducer