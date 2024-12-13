import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const clearInputs = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputFields} />
        </div>
        <div>
          author
          <input {...author.inputFields} />
        </div>
        <div>
          url for more info
          <input {...info.inputFields} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={clearInputs}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
