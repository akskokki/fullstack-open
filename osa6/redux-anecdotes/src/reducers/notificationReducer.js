import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification(state, action) {
      state.push(action.payload)
    },
    clearNotification(state) {
      state.shift()
    },
  },
})

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
