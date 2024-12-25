import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [infoText, setInfoText] = useState(null)
  const [errorText, setErrorText] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    updateBlogs()
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

  const updateBlogs = async () => {
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      await updateBlogs()

      blogFormRef.current.toggleVisibility()

      setInfoText(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setInfoText(null)
      }, 5000)
    } catch {
      setErrorText('blog creation failed')
      setTimeout(() => {
        setErrorText(null)
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    await blogService.remove(id)
    await updateBlogs()
  }

  const addLike = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    await updateBlogs()
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorText} type='error' />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              autoComplete='username'
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              autoComplete='current-password'
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={infoText} type='info' />
      <Notification message={errorText} type='error' />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <br />
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
