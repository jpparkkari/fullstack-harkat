import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'



const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    dispatch(filterChange(event.target.value))
    // -> filterReduceriin
    // 
    // -> AnecdoteListiin 
    // query = state.filter
    //state.anecdotes.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter