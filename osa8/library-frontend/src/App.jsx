import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
  const [token, setToken] = useState()
  const client = useApolloClient()
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <>
      <div>
        <Link to="/authors">
          <button>authors</button>
        </Link>{' '}
        <Link to="/books">
          <button>books</button>
        </Link>{' '}
        {token ? (
          <>
            <Link to="/newBook">
              <button>add book</button>
            </Link>{' '}
            <Link to="/recommend">
              <button>recommend</button>
            </Link>{' '}
            <button onClick={logout}>log out</button>
          </>
        ) : (
          <Link to="/login">
            <button>login</button>
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<h2>{'welcome :)'}</h2>} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newBook" element={<NewBook />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </>
  )
}

export default App
