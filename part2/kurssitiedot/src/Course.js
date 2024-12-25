const Header = ({ text }) => (
    <div>
        <h2>{text}</h2>
    </div>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
    </div>
)

const Part = ({ name, exercises }) => (
    <p>{name} {exercises}</p>
)

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Course = ({ course }) => (
    <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course