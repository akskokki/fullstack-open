import { ALL_BOOKS } from './queries'

export const updateBookCache = (cache, book) => {
  const genres = book.genres.concat(null)
  genres.map((g) => {
    cache.updateQuery({ query: ALL_BOOKS, variables: { genre: g } }, (data) => {
      if (!data) return
      if (data.allBooks.find((b) => b.id === book.id)) return
      return {
        allBooks: data.allBooks.concat(book),
      }
    })
  })
}
