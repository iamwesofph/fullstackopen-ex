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
            <Content parts={course.parts} />
            <Total course={course} />
        </div>
    );
};

export default Course;
