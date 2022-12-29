import { useState, useEffect } from 'react'
import personService from "./services/persons"


const Notification = ({ message, colour }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='notification' style={{ color: colour }}>
            {message}
        </div>
    )
}

const Filter = ({ value, handleChange }) => (
    <div>
        filter shown with
        <input
            value={value}
            onChange={handleChange}
        />
    </div>
)

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
    <form onSubmit={addPerson}>
        <div>
            name:
            <input
                value={newName}
                onChange={handleNameChange}
            />
        </div>
        <div>
            number:
            <input
                value={newNumber}
                onChange={handleNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

const Persons = ({ persons, eradicatePerson, searchTerm }) => (
    persons.filter(
        person => person.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(
        person => <Person key={person.id} person={person} persons={persons} eradicatePerson={eradicatePerson} />
    )
)

const Person = ({ person, eradicatePerson }) => {
    const handleButton = () => eradicatePerson(person)

    return (
        <p>
            {person.name} {person.number}
            <button onClick={handleButton}>ERADICATE</button>
        </p>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationColour, setNotificationColour] = useState("green")

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleSearchChange = (event) => setSearchTerm(event.target.value)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const notify = (message) => {
        setNotificationMessage(message)
        setNotificationColour("green")
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const notifyError = (message) => {
        setNotificationMessage(message)
        setNotificationColour("red")
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        const oldPerson = persons.find(person => person.name === newPerson.name)
        if (oldPerson && window.confirm(`${newPerson.name} is already in the phonebook, replace the old number with a new one?`)) {
            personService
                .update(oldPerson.id, newPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
                    setNewName("")
                    setNewNumber("")
                    notify(`Updated number for ${returnedPerson.name}`)
                })
                .catch(() => {
                    notifyError(`${newPerson.name} has already been ERADICATED from the server`)
                    setPersons(persons.filter(person => person.id !== oldPerson.id))
                })
            return
        }

        personService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName("")
                setNewNumber("")
                notify(`Added ${returnedPerson.name}`)
            })
            .catch(error => {
                notifyError(error.response.data.error)
            })
    }

    const eradicatePerson = (person) => {
        if (window.confirm(`ERADICATE ${person.name}?`))
            personService
                .eradicate(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    notify(`ERADICATED ${person.name}`)
                })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} colour={notificationColour} />
            <Filter value={searchTerm} handleChange={handleSearchChange} />
            <h3>Add a new</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons persons={persons} eradicatePerson={eradicatePerson} searchTerm={searchTerm} />
        </div>
    )
}

export default App