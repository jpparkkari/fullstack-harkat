import React from 'react'
import ReactDOM from 'react-dom'
import Container from '@material-ui/core/Container'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import store from './store'
import {
  BrowserRouter as Router
} from "react-router-dom"

//const store = createStore(notificationReducer, composeWithDevTools())

ReactDOM.render(
  <Container>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Container>, 
  document.getElementById('root')
  
)