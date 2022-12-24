import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({ anecdote, votes }) => (
    <div>
        <div>{anecdote}</div>
        <div>has {votes} votes</div>
    </div>
)

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
    const bestAnecdoteIndex = votes.indexOf(Math.max(...votes))
    console.log(bestAnecdoteIndex)

    const nextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
    const voteAnecdote = () => {
        let votesCopy = [...votes]
        votesCopy[selected] += 1
        setVotes(votesCopy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
            <div>
                <Button handleClick={voteAnecdote} text="vote" />
                <Button handleClick={nextAnecdote} text="next anecdote" />
            </div>
            <h1>Anecdote with most votes</h1>
            <Anecdote anecdote={anecdotes[bestAnecdoteIndex]} votes={votes[bestAnecdoteIndex]} />
        </div>
    )
}

export default App