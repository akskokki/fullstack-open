import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let mockAddLike

  beforeEach(() => {
    const blog = {
      author: 'testAuthor',
      title: 'testTitle',
      url: 'testUrl',
      likes: 0,
      user: {
        username: 'testUsername',
      },
    }

    mockAddLike = vi.fn()

    render(
      <Blog
        blog={blog}
        addLike={mockAddLike}
        removeBlog={vi.fn()}
        user={{ username: 'testUsername' }}
      />,
    )
  })

  test('renders only title and author by default', async () => {
    screen.getByText('testAuthor', { exact: false })
    screen.getByText('testTitle', { exact: false })
    expect(screen.queryByTestId('blogUrl')).toBeNull()
    expect(screen.queryByTestId('blogLikes')).toBeNull()
  })

  test('details are shown when details button has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByTestId('blogDetailsButton')
    await user.click(button)

    expect(screen.getByTestId('blogUrl')).toHaveTextContent('testUrl')
    expect(screen.getByTestId('blogLikes')).toHaveTextContent('likes 0')
  })

  test('addLike is called twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByTestId('blogDetailsButton')
    await user.click(button)

    const likeButton = screen.getByTestId('blogLikeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockAddLike.mock.calls).toHaveLength(2)
  })
})
