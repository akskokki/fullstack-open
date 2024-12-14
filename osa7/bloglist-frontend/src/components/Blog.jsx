import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [details, setDetails] = useState(false)

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
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    addLike(blog.id, blogObject)
  }

  const handleRemove = () => {
    if (window.confirm(`delete blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
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
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
