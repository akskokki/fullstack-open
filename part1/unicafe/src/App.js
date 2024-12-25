import { useState } from 'react'

const Button = ({ handleClick, name }) => <button onClick={handleClick}>{name}</button>

const Statistics = ({ good, neutral, bad }) => {
    const getTotal = () => good + neutral + bad
    const getAverage = () => (good - bad) / getTotal()
    const getPositivePct = () => good / getTotal() * 100 + " %"

    if (getTotal() <= 0) {
        return <div>No feedback given</div>
    }
    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={getTotal()} />
                <StatisticLine text="average" value={getAverage()} />
                <StatisticLine text="positive" value={getPositivePct()} />
            </tbody>
        </table>
    )
}

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}:</td>
        <td>{value}</td>
    </tr>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} name="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} name="neutral" />
            <Button handleClick={() => setBad(bad + 1)} name="bad" />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App