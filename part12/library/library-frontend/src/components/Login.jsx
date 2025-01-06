import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken }) => {
  const [login, result] = useMutation(LOGIN)
  const navigate = useNavigate()

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/')
    }
  })

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    login({ variables: { username, password } })
  }

  return (
    <>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input name="username" />
        </div>
        <div>
          password <input name="password" type="password" />
        </div>
        <button>log in</button>
      </form>
    </>
  )
}

export default Login
