import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecoteList />
    </div>
  )
}

export default App