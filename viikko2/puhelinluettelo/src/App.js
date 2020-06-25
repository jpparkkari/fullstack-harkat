import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true) 

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button pressed', event.target)
    if (persons.indexOf(persons.find(person => person.name === newName)) === -1) {

      const personObject = {
        name: newName,
        number: newNumber,
      
      }

      axios
        .post('http://localhost:3001/persons', personObject)
        .then(returnedNote => {
          setPersons(persons.concat(personObject))
        })

      
    }
    else {
      
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
    
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
    
  }


  const handleFilterChange = (event) => {
    
    setNewFilter(event.target.value)
    
    setShowAll(event.target.value.length === 0)
    
  }


  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      
      <h2>Numbers</h2>
      
      <Persons persons={personsToShow} />

      



    </div>
  )

}

export default App