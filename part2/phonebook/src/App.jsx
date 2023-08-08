/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

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
                        <button onClick={() => handleDelete(person.id)}>Delete</button>
                    </li>
                );
            })}
        </ul>
    );
};

// const initialPersons = [
//     { name: "Arto Hellas", number: "040-123456", id: 1 },
//     { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
//     { name: "Dan Abramov", number: "12-43-234345", id: 3 },
//     { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
// ];

const App = () => {
    // const [persons, setPersons] = useState(initialPersons);
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");

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

        personService.create(personObject).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName("");
            setNewNumber("");
        });
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

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete user?") === true) {
            personService.remove(id).then((deletedPerson) => {
                const updatedPersons = persons.filter((person) => person.id !== id);
                setPersons(updatedPersons);
                console.log(`Deleted ${deletedPerson}`);
            });
        }
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const newPerson = {
    //         name: newName,
    //         number: newNumber,
    //     };

    //     const existingPerson = persons.find((person) => person.name === newPerson.name);

    //     if (existingPerson) {
    //         alert(`${newName} is already added to phonebook`);
    //     } else {
    //         setPersons([...persons, newPerson]);
    //         setNewName("");
    //         setNewNumber("");
    //     }
    // };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleChangeSearch={handleChangeSearch} search={search} />
            <PersonForm newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} addPerson={addPerson} />
            <h2>Numbers</h2>
            <Persons persons={persons} search={search} handleDelete={handleDelete} />
        </div>
    );
};

export default App;
