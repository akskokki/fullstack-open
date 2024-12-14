import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls createBlog with correct data when submitted', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByTestId('blogFormTitleInput')
  const authorInput = screen.getByTestId('blogFormAuthorInput')
  const urlInput = screen.getByTestId('blogFormUrlInput')
  await user.type(titleInput, 'testTitle')
  await user.type(authorInput, 'testAuthor')
  await user.type(urlInput, 'testUrl')

  await user.click(screen.getByTestId('blogFormSubmitButton'))

  expect(createBlog.mock.calls).toHaveLength(1)
  const createdBlog = createBlog.mock.calls[0][0]
  expect(createdBlog.title).toBe('testTitle')
  expect(createdBlog.author).toBe('testAuthor')
  expect(createdBlog.url).toBe('testUrl')
})
