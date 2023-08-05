import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const handleChange = (event) => {
        setNewName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPerson = { name: newName };

        const existingPerson = persons.find((person) => person.name === newPerson.name);

        if (existingPerson) {
            alert(`${newName} is already added to phonebook`);
        } else {
            setPersons([...persons, newPerson]);
            setNewName("");
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input type="text" onChange={handleChange} value={newName} />
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
                    return <li key={index}>{person.name}</li>;
                })}
            </ul>
        </div>
    );
};

export default App;
