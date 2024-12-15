import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (!message) return null

  return <Alert severity={type}>{message}</Alert>
}

export default Notification
