import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecoteList from './components/AnecdoteList'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecoteList />
    </div>
  )
}

export default App