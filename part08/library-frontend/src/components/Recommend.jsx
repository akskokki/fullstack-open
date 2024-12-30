import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE, ALL_BOOKS } from '../queries'

const Recommend = () => {
  const resultGenre = useQuery(FAVORITE_GENRE)

  const genre = resultGenre.loading ? null : resultGenre.data.me.favoriteGenre

  const resultBooks = useQuery(ALL_BOOKS, {
    skip: !genre,
    variables: { genre },
  })

  const bookList = () => {
    if (resultBooks.loading || resultGenre.loading) return null
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
      <h2>recommendations</h2>
      <div>
        books in your favourite genre <strong>{genre}</strong>
      </div>
      {bookList()}
    </>
  )
}

export default Recommend
