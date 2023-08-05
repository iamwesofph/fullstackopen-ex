const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    );
};

const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};
const Content = ({ parts }) => {
    return (
        // <>
        //     <Part part={parts[0].name} exercises={parts[0].exercises}></Part>
        //     <Part part={parts[1].name} exercises={parts[1].exercises}></Part>
        //     <Part part={parts[2].name} exercises={parts[2].exercises}></Part>
        // </>
        <>
            {parts.map((part, index) => (
                <Part key={index} part={part.name} exercises={part.exercises} />
            ))}
        </>
    );
};

const Total = ({ course }) => {
    const total = course.parts.reduce((total, part) => total + part.exercises, 0);

    return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            {/* <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises}></Content> */}
            <Content parts={course.parts} />
            {/* <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}></Total> */}
            <Total course={course} />
        </div>
    );
};

const App = () => {
    const course = {
        id: 1,
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2,
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3,
            },
            {
                name: "Redux",
                exercises: 100,
                id: 4,
            },
        ],
    };

    return <Course course={course} />;
};

export default App;
