import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>      
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <AnecoteList />
    </div>
  )
}

export default App