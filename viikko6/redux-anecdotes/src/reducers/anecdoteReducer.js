import anecdoteService from '../services/anecdotes'
const reducer = (state = [], action) => {

  //cases
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b)=> b.votes - a.votes)
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data).sort((a, b)=> b.votes - a.votes)
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}
    
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdoteToChange) => {
  return async dispatch => {
    const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes+1}
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch( {
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}


export default reducer