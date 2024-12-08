import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [infoText, setInfoText] = useState(null)
  const [errorText, setErrorText] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorText('Wrong credentials')
      setTimeout(() => {
        setErrorText(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title,
        author,
        url,
        likes: 0,
      }

      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      setInfoText(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setInfoText(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setErrorText('blog creation failed')
      setTimeout(() => {
        setErrorText(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorText} type="error" />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              autoComplete="username"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={infoText} type="info" />
      <Notification message={errorText} type="error" />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      <h2>bloglist:</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
