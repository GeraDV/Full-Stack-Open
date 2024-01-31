import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Search from './components/Search'
import AddContact from './components/AddContact'
import personService from './services/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState() 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showFiltered, setShowFiltered] = useState(persons);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationClass, setNotificationClass] = useState('success');

  const handleLoadPersons = () => {
    personService
      .getAll()
      .then(numbers => {
        setPersons(numbers)
      })
  }
  useEffect(handleLoadPersons, [])

  const handleAddPerson = (event) => {
    event.preventDefault();
    if(persons.some(p => p.name === newName)){
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      window.confirm(message) && handleUpdateNumber(newName);
    }else{
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
        })

      setNotificationMessage(`Added ${newPerson.name}`)
      setNotificationClass('success');
      setTimeout(()=>{
        setNotificationMessage('');
      }, 5000);
      
      setNewName('');
      setNewNumber('');
    }
  }

  const handleUpdateNumber = (name) => {
    const person = persons.find(p => p.name === name);
    const newPerson = {...person, number:newNumber}
    personService
      .update(newPerson)
      .then(updatedPerson => setPersons(persons.map(p => p.name !== name? p : updatedPerson)))
      .catch(error => {
        setNotificationClass('error');
        setNotificationMessage(`Information of ${name} has already been removed from server`);
        setTimeout(()=>{
          setNotificationMessage('');
        }, 5000);
        setPersons(persons.filter(p => p.name !== name))
      })
    setNewName('');
    setNewNumber('');
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const text = event.target.value
    setFilter(text)
    setShowFiltered(persons.filter(p => p.name.toLowerCase().includes(text.toLowerCase())))
  }

  const handleDelete = (id) => {
    const personDelete = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${personDelete.name}?`)){
      personService
      .remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(err => alert('This contact is not found on the server'))
    }
  }

  return (
    <div>
      <Search value={filter} handleFilter={handleFilter}/>
      <AddContact 
          newName={newName}
          newNumber={newNumber}
          handleNewName={handleNewName}
          handleNewNumber={handleNewNumber}
          handleAddPerson={handleAddPerson}
      />
      <Notification message={notificationMessage} className={notificationClass}/>
      <Numbers numbers={filter? showFiltered : persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App