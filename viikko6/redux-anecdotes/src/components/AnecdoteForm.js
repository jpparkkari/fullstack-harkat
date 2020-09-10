import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notificationChange(`You created anecdote '${content}'`))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={create}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
    </>
  )
}

export default AnecdoteForm