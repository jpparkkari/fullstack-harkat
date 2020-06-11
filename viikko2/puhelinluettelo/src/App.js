import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '1234'},
    { name: 'Ada Lovelace',
      number: '2345',
  }
  ]
  )

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true) 

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button pressed', event.target)
    if (persons.indexOf(persons.find(person => person.name === newName)) === -1) {

      const personObject = {
        name: newName,
        number: newNumber,
      
      }
      setPersons(persons.concat(personObject))
    }
    else {
      
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
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
      
      <ul>
        {personsToShow.map((person, i) => 
          <Persons key={person.name} person={person} />
        )}
      </ul>



    </div>
  )

}

export default App