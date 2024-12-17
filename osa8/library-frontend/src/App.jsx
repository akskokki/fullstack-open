import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <div>
        <Link to="/authors">
          <button>authors</button>
        </Link>{' '}
        <Link to="/books">
          <button>books</button>
        </Link>{' '}
        <Link to="/newBook">
          <button>add book</button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<div>{'welcome :)'}</div>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newBook" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
