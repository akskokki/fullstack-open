import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const [notifications] = useContext(NotificationContext)

  if (notifications.length < 1) return null

  return <div style={style}>{notifications.at(-1)}</div>
}

export default Notification
