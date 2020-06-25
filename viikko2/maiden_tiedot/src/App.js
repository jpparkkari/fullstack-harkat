import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [weather, setWeather] = useState([])


  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

 



  const handleFilterChange = (event) => {
    
    setNewFilter(event.target.value) 
    setShowAll(event.target.value.length === 0)
    
  }


  const countriesToShow = showAll 
  ? countries 
  : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>

      <Filter value={newFilter} onChange={handleFilterChange} />
      
      <Countries countries={countriesToShow} setter={setNewFilter}/>

      



    </div>
  )

}

export default App 
