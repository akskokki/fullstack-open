import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const [details, setDetails] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = () => {
    setDetails(!details)
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    if (window.confirm(`delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const blogDetails = () => (
    <>
      <div data-testid="blogUrl">{blog.url}</div>
      <div data-testid="blogLikes">
        likes {blog.likes}{' '}
        <button data-testid="blogLikeButton" onClick={handleLike}>
          like
        </button>
      </div>
      <div data-testid="blogUsername">{blog.user.username}</div>
      {user.username === blog.user.username && (
        <button onClick={handleRemove}>remove</button>
      )}
    </>
  )

  return (
    <div data-testid="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button data-testid="blogDetailsButton" onClick={toggleDetails}>
          {details ? 'hide' : 'view'}
        </button>
      </div>
      {details && blogDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
