import { useQuery } from '@apollo/client'
import { ALL_GENRES, ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState(null)
  const resultBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
  })
  const resultGenres = useQuery(ALL_GENRES)

  const handleGenre = (genre) => {
    setGenre(genre)
  }

  const genreList = () => {
    if (resultGenres.loading) return null
    const genres = resultGenres.data.allGenres
    return (
      <div>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => handleGenre(g)}
            style={{ marginRight: 5 }}
          >
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    )
  }

  const bookList = () => {
    if (resultBooks.loading) return null
    const books = resultBooks.data.allBooks
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(genre ? (b) => b.genres.includes(genre) : () => true)
            .map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <h2>books</h2>
      <div>
        in genre <strong>{genre ? genre : 'all genres'}</strong>
      </div>
      {genreList()}
      {bookList()}
    </>
  )
}

export default Books
