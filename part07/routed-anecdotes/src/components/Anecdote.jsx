const Anecdote = ({ anecdote }) => (
  <div>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <div>has {anecdote.votes} votes</div>
    <br />
    <div>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </div>
    <br />
  </div>
)

export default Anecdote
