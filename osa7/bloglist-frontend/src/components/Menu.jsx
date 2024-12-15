import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const padding = {
    paddingRight: 5,
  }

  const style = {
    backgroundColor: '#bbbbbb',
    padding: 5,
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(clearUser())
  }

  return (
    <div style={style}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <span style={padding}>{user.name} logged in</span>
      <span style={padding}>
        <button onClick={handleLogout}>log out</button>
      </span>
    </div>
  )
}

export default Menu
