const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    );
};

const Header = ({ course }) => {
    return <h1>{course}</h1>;
};

const Content = (props) => {
    return (
        <>
            <Part part={props.part1} exercises={props.exercise1}></Part>
            <Part part={props.part2} exercises={props.exercises2}></Part>
            <Part part={props.part3} exercises={props.exercises3}></Part>
        </>
    );
};

const Total = (props) => {
    return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>;
};

const App = () => {
    // const course = "Half Stack application development";
    // const part1 = "Fundamentals of React";
    // const exercises1 = 10;
    // const part2 = "Using props to pass data";
    // const exercises2 = 7;
    // const part3 = "State of a component";
    // const exercises3 = 14;

    const course = "Half Stack application development";
    const part1 = {
        name: "Fundamentals of React",
        exercises: 10,
    };
    const part2 = {
        name: "Using props to pass data",
        exercises: 7,
    };
    const part3 = {
        name: "State of a component",
        exercises: 14,
    };

    return (
        <div>
            <Header course={course} />
            <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises}></Content>
            <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}></Total>
        </div>
    );
};

export default App;
