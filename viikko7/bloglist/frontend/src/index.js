import React from 'react'
import ReactDOM from 'react-dom'
import Container from '@material-ui/core/Container'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import {
  BrowserRouter as Router
} from "react-router-dom"

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