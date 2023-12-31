import { useState } from "react";

function generateRandomId() {
    // Define the range for the random ID
    const min = 0; // Minimum value for the random ID
    const max = 7; // Maximum value for the random ID

    // Generate a random number within the defined range
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomId;
}

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
        "test",
    ];

    const [selected, setSelected] = useState(generateRandomId());
    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

    const handleNextQuote = () => {
        return setSelected(generateRandomId());
    };

    const handleVote = () => {
        const copy = [...votes];
        copy[selected] += 1;
        console.log(copy);
        setVotes(copy);
    };

    const highestNumber = Math.max(...votes);
    console.log(highestNumber); // Output: 89
    const index = votes.indexOf(highestNumber);
    console.log(index); // Output: 89

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <p>Has {votes[selected]} votes</p>
            <button onClick={handleNextQuote}>Next Quote</button>
            <button onClick={handleVote}>Vote</button>
            <br />
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[index]}</p>
            <p>Has {votes[index]} votes</p>
        </>
    );
};

export default App;
