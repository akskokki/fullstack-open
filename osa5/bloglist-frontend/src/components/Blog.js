import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, loggedUser, removeBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={() => likeBlog(blog.id.toString())}>like</button></div>
      <div>{blog.user.name ? blog.user.name : blog.user.username}</div>
      {loggedUser.username === blog.user.username &&
        <div><button onClick={() => removeBlog(blog.id)}>remove</button></div>}
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setViewDetails(!viewDetails)}>view</button>
      </div>
      {viewDetails && details()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  removeBlog: PropTypes.func.isRequired
}

export default Blog