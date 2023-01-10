import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> correctly calls addBlog on submit', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()

  render(<BlogForm addBlog={addBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const submitButton = screen.getByRole('button')

  await user.type(inputTitle, 'testTitle')
  await user.type(inputAuthor, 'testAuthor')
  await user.type(inputUrl, 'testUrl')
  await user.click(submitButton)

  const submittedBlog = addBlog.mock.calls[0][0]
  expect(submittedBlog.title).toBe('testTitle')
  expect(submittedBlog.author).toBe('testAuthor')
  expect(submittedBlog.url).toBe('testUrl')
})