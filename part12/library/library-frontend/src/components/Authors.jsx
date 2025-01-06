import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (result.loading) return null

  const authors = result.data.allAuthors

  const handleEdit = (event) => {
    event.preventDefault()

    const name = event.target.authorName.value
    const setBornTo = Number(event.target.authorBorn.value)
    editAuthor({ variables: { name, setBornTo } })

    event.target.authorName.selectedIndex = 0
    event.target.authorBorn.value = ''
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={handleEdit}>
        <div>
          <select name="authorName">
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born <input name="authorBorn" />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
