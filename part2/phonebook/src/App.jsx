import { useState } from "react";

const initialPersons = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];

const App = () => {
    const [persons, setPersons] = useState(initialPersons);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");

    const handleChangeName = (event) => {
        setNewName(event.target.value);
    };

    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        const existingPerson = persons.find((person) => person.name === newPerson.name);

        if (existingPerson) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons([...persons, newPerson]);
            setNewName("");
            setNewNumber("");
        }
    };

    const personsToShow = persons.filter((person) => person.name.includes(search));

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    Search: <input type="text" onChange={handleChangeSearch} value={search} />
                </div>
                <div>
                    Name: <input type="text" onChange={handleChangeName} value={newName} />
                </div>
                <div>
                    Number: <input type="text" onChange={handleChangeNumber} value={newNumber} />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>
                        Add
                    </button>
                </div>
            </form>

            <h2>Numbers</h2>
            <ul>
                {personsToShow.map((person, index) => {
                    return <li key={index}>{`${person.name} ${person.number}`}</li>;
                })}
            </ul>
        </div>
    );
};

export default App;
