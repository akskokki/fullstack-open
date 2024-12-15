import { useDispatch } from 'react-redux'
import { commentBlog, likeBlog } from '../../reducers/blogReducer'
import { Button, Link, Paper, TextField, Typography } from '@mui/material'

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
    <Paper elevation={5} sx={{ p: 2 }}>
      <Typography variant="h4">
        {blog.title} by {blog.author}
      </Typography>
      <Typography>
        <Link href={blog.url}>{blog.url}</Link>
      </Typography>
      <Typography>
        {blog.likes} likes{' '}
        <Button variant="outlined" onClick={handleLike}>
          like
        </Button>
      </Typography>
      <Typography>added by {blog.user.name}</Typography>
      <Typography variant="h5" sx={{ my: 1 }}>
        comments
      </Typography>
      <form onSubmit={handleComment}>
        <TextField size="small" name="comment" label="comment"></TextField>
        <Button type="submit" variant="contained" sx={{ mx: 1 }}>
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>
            <Typography>{comment}</Typography>
          </li>
        ))}
      </ul>
    </Paper>
  )
}

export default BlogView
