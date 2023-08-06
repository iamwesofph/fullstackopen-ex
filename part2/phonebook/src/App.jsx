import { useState } from "react";

const initialPersons = [
    {
        name: "Arto Hellas",
        number: "12345",
    },
    {
        name: "Wes Q",
        number: "67890",
    },
];

const App = () => {
    const [persons, setPersons] = useState(initialPersons);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleChangeName = (event) => {
        setNewName(event.target.value);
    };

    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value);
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

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input type="text" onChange={handleChangeName} value={newName} />
                </div>
                <div>
                    number: <input type="text" onChange={handleChangeNumber} value={newNumber} />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>
                        add
                    </button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person, index) => {
                    return <li key={index}>{`${person.name} ${person.number}`}</li>;
                })}
            </ul>
        </div>
    );
};

export default App;
