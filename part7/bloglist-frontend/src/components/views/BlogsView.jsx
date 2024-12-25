import { useSelector } from 'react-redux'
import Blog from '../Blog'
import BlogForm from '../BlogForm'
import { Box } from '@mui/material'

const BlogsView = ({ blogs }) => {
  const user = useSelector((state) => state.user)

  return (
    <div>
      <Box>
        <BlogForm />
      </Box>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default BlogsView
