

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

export const notificationChange = (notification, time) => {
  return async dispatch => {
    dispatch ({
      type: 'SET_NOTIFICATION',
      notification,
    })
    await new Promise(resolve => setTimeout(resolve, time*1000))
    dispatch ({
      type: 'SET_NOTIFICATION',
      notification: '',
    })
  }
}

export default notificationReducer