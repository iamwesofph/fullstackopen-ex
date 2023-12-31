import { useState } from "react";

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Feedback = ({ handleClickGood, handleClickNeutral, handleClickBad }) => {
    return (
        <>
            <h1>Give Feedback</h1>
            <Button handleClick={handleClickGood} text="Good"></Button>
            <Button handleClick={handleClickNeutral} text="Neutral"></Button>
            <Button handleClick={handleClickBad} text="Bad"></Button>
        </>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const total = good + bad + neutral;
    const average = (good - bad) / total;
    const positive = (good / total) * 100;

    if (total === 0) {
        return <p>No feedback yet</p>;
    } else {
        return (
            <>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <tr>
                            <StatisticLine text="Good" value={good} />
                        </tr>
                        <tr>
                            <StatisticLine text="Neutral" value={neutral} />
                        </tr>
                        <tr>
                            <StatisticLine text="Bad" value={bad} />
                        </tr>
                        <tr>
                            <StatisticLine text="All" value={total} />
                        </tr>
                        <tr>
                            <StatisticLine text="Average" value={average} />
                        </tr>
                        <tr>
                            <StatisticLine text="Positive" value={`${positive}%`} />
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
};

const StatisticLine = ({ text, value }) => {
    return (
        <>
            <td>{text}</td>
            <td>{value}</td>
        </>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClickGood = () => setGood(good + 1);
    const handleClickNeutral = () => setNeutral(neutral + 1);
    const handleClickBad = () => setBad(bad + 1);

    return (
        <>
            <Feedback handleClickGood={handleClickGood} handleClickNeutral={handleClickNeutral} handleClickBad={handleClickBad}></Feedback>
            <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
        </>
    );
};

export default App;
