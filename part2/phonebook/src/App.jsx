/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import "./index.css";

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return <div className="error">{message}</div>;
};

const Filter = ({ handleChangeSearch, search }) => {
    return (
        <div>
            Search: <input type="text" onChange={handleChangeSearch} value={search} />
        </div>
    );
};

const PersonForm = ({ newName, newNumber, handleChangeName, handleChangeNumber, addPerson }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                Name: <input type="text" onChange={handleChangeName} value={newName} />
            </div>
            <div>
                Number: <input type="text" onChange={handleChangeNumber} value={newNumber} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

const Persons = ({ persons, search, handleDelete }) => {
    const personsToShow = persons.filter((person) => person.name.includes(search));
    return (
        <ul>
            {personsToShow.map((person, index) => {
                return (
                    <li key={index}>
                        {`${person.name} ${person.number}`}
                        <button onClick={() => handleDelete(person)}>Delete</button>
                    </li>
                );
            })}
        </ul>
    );
};

const App = () => {
    // const [persons, setPersons] = useState(initialPersons);
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then((response) => {
            setPersons(response.data);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();

        const personObject = {
            name: newName,
            number: newNumber,
        };

        const existingPerson = persons.find((person) => person.name === newName);
        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`) === true) {
                personService
                    .update(existingPerson.id, personObject)
                    .then((returnedPerson) => {
                        setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
                        setErrorMessage(`Successfully updated ${returnedPerson.name}'s, phone number.`);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    })
                    .catch((error) => {
                        setErrorMessage(`Cannot access ${existingPerson.name}'s data from the server. Error ${error}`);
                        console.log("HTTP request error caught");
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                        setPersons(persons.filter((person) => person.id !== existingPerson.id));
                    });
            }
        } else {
            personService.create(personObject).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewNumber("");
                setErrorMessage(`Successfully added ${returnedPerson.name}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
        }
    };

    const handleChangeName = (event) => {
        setNewName(event.target.value);
    };

    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleDelete = (person) => {
        if (window.confirm(`Are you sure you want to delete user ${person.name}?`) === true) {
            personService.remove(person.id).then((deletedPerson) => {
                const updatedPersons = persons.filter((updatedPerson) => updatedPerson.id !== person.id);
                setPersons(updatedPersons);
                console.log(`Deleted ${deletedPerson}`);
            });
        }
    };

    return (
        <div>
            <Notification message={errorMessage} />
            <h2>Phonebook</h2>
            <Filter handleChangeSearch={handleChangeSearch} search={search} />
            <PersonForm newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} addPerson={addPerson} />
            <h2>Numbers</h2>
            <Persons persons={persons} search={search} handleDelete={handleDelete} />
        </div>
    );
};

export default App;
