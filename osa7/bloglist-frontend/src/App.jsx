import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'

import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import UsersView from './components/views/UsersView'
import BlogsView from './components/views/BlogsView'
import UserView from './components/views/UserView'
import BlogView from './components/views/BlogView'
import Menu from './components/Menu'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const currentUser = useSelector((state) => state.user)

  // fetch blogs on load
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // fetch users on load
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

  // fetch logged-in user on load
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)

      setUsername('')
      setPassword('')
    } catch {
      dispatch(notify('wrong credentials', 'error'))
    }
  }

  const matchUser = useMatch('/users/:id')
  const user =
    matchUser && users ? users.find((u) => u.id === matchUser.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  const blog =
    matchBlog && blogs ? blogs.find((u) => u.id === matchBlog.params.id) : null

  if (currentUser === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
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
      <Menu />
      <h1>blog app</h1>
      <Notification />
      <Routes>
        <Route path="/" element={<BlogsView blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
        <Route path="/users" element={<UsersView users={users} />} />
        <Route path="/users/:id" element={<UserView user={user} />} />
      </Routes>
    </div>
  )
}

export default App
