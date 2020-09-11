import anecdoteService from '../services/anecdotes'
const reducer = (state = [], action) => {

  //cases
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes+1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b)=> b.votes - a.votes)
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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}


export default reducer