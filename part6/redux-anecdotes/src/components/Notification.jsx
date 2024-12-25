import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => {
    if (state.notifications) return state.notifications.at(-1)
    return null
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  if (!notification) {
    return null
  }

  return <div style={style}>{notification}</div>
}

export default Notification
