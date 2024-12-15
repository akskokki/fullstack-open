import { useDispatch } from 'react-redux'
import { commentBlog, likeBlog } from '../../reducers/blogReducer'

const BlogView = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, event.target.comment.value))
    event.target.comment.value = ''
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
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input name="comment"></input>
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
