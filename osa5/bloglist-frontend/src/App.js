import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    try {
      event.preventDefault()

      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notify('invalid username or password')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')

    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    const returnedBlog = await blogService.create(newBlog)
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(returnedBlog))
    notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
  }

  const likeBlog = async (blogId) => {
    const blog = blogs.find(b => b.id === blogId)
    const returnedBlog = await blogService.addLike(blog)
    setBlogs(blogs.map(b => {
      return b.id === blogId ? returnedBlog : b
    }))
  }

  const notification = () => (
    <div style={{ border: '5px', borderColor: 'blue', borderStyle: 'solid', padding: '0.5em' }}>
      {notificationMessage}
    </div>
  )

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogsView = () => (
    <div>
      <button onClick={() => console.log(blogs)}>clog blogs</button>
      <h2>blogs</h2>
      <p>
        {user.name || user.username} logged in
        <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />)
      }
    </div>
  )

  return (
    <div>
      {notificationMessage !== null && notification()}
      {user === null ?
        loginView()
        :
        blogsView()
      }
    </div>
  )
}

export default App
