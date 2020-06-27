import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true) 

  useEffect(() => {
    personService
      .getAll()
      .then( returnedPerson => {
        setPersons(returnedPerson)
      })

      
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button pressed', event.target)
    const personFound = persons.find(person => person.name === newName)
    if (!personFound) {

      const personObject = {
        name: newName,
        number: newNumber,
      
      }

      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

      
    }
    else {
      
      if(window.confirm(`${newName} is already added to phonebook with number ${personFound.number}. Do you want to replace the number with ${newNumber}?`)){
        
        const changedPerson = { ...personFound, number: newNumber }
        personService
        .update(personFound.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personFound.id ? person : returnedPerson))
        })
        .catch(error => {
          alert(
            `the person '${personFound.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== personFound.id))
        })
  

        
      }
      
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

  const deletePersonById = (id) => {
    //console.log("person " + event + " needs to be deleted" )
    if (window.confirm("Delete person id "+ id +"?")) {
      personService
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))

        .catch(error => {
          alert(
          `the person was already deleted from server`
          )
         setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const personsToShow = showAll 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter 
        value={newFilter} 
        onChange={handleFilterChange} 
      />

      <PersonForm 
        onSubmit={addPerson} 
        nameValue={newName} 
        numberValue={newNumber} 
        nameHandler={handleNameChange} 
        numberHandler={handleNumberChange} 
      />
      
      <h2>Numbers</h2>
      
      <Persons 
        persons={personsToShow} 
        removePerson = {deletePersonById}
      />

      



    </div>
  )

}

export default App