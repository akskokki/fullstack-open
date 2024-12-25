import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(clearUser())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <Typography sx={{ mx: 2 }}>{user.name} logged in</Typography>
          <Button
            size="small"
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Menu
