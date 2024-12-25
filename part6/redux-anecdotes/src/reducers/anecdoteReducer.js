import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)
      anecdoteToChange.votes += 1
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const returnedAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(returnedAnecdote))
  }
}

export const voteFor = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()
    const anecdoteToChange = anecdotes.find((a) => a.id === id)
    const returnedAnecdote = await anecdoteService.update(anecdoteToChange.id, {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    })
    dispatch(addVote(returnedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
