import { useDispatch } from 'react-redux'
import { likeBlog } from '../../reducers/blogReducer'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes<button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogView
