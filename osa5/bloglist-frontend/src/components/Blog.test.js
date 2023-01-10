import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const mocks = {}
  beforeEach(() => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 42,
      id: 'testId',
      user: {
        username: 'testUser',
        name: 'testName'
      }
    }

    const mockLike = jest.fn()
    const mockRemove = jest.fn()
    const loggedUser = { username: 'loggedUser' }

    mocks.like = mockLike
    mocks.remove = mockRemove

    render(<Blog blog={blog} likeBlog={mockLike} loggedUser={loggedUser} removeBlog={mockRemove} />)
  })

  test('renders only title and author when unopened', () => {
    screen.getByText('testTitle testAuthor')
    expect(screen.queryByText('testUrl')).toBeNull
    expect(screen.queryByText('42')).toBeNull
  })

  test('renders details when opened', async () => {
    const user = userEvent.setup()
    const detailsButton = screen.getByText('view')

    await user.click(detailsButton)

    screen.getByText('testUrl')
    screen.getByText('42')
    screen.getByText('testName')
  })

  test('like button can be pressed twice', async () => {
    const user = userEvent.setup()
    const detailsButton = screen.getByText('view')

    await user.click(detailsButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mocks.like.mock.calls).toHaveLength(2)
  })
})