import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

  const anecdotes = useSelector(state => state.sort((a, b)=> b.votes - a.votes))
  const dispatch = useDispatch()

  return (
    <>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        onClick={() => dispatch(voteAnecdote(anecdote.id))}
      />
    )}
    </>
  )

}

export default AnecdoteList