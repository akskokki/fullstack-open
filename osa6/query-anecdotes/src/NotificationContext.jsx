import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, action.payload]
    case 'CLEAR_NOTIFICATION':
      return state.slice(1)
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notifications, notificationDispatch] = useReducer(
    notificationReducer,
    []
  )

  return (
    <NotificationContext.Provider value={[notifications, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
