import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, onClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={onClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const query = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(query.toLowerCase()))//.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  const dispatch = useDispatch()

  return (
    <>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        onClick={() => {
          dispatch(voteAnecdote(anecdote))
          dispatch(notificationChange(`You voted anecdote '${anecdote.content}'`, 5))
          /*setTimeout(() => {
            dispatch(notificationChange(''))
          }, 5000)*/
        }}
    
      />
    )}
    </>
  )

}

export default AnecdoteList