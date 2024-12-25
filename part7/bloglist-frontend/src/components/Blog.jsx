import { Paper, Typography, Link } from '@mui/material'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <Paper elevation={3} sx={{ my: 1, p: 1 }}>
      <Link component={RouterLink} to={`/blogs/${blog.id}`}>
        <Typography>
          {blog.title} by {blog.author}
        </Typography>
      </Link>
    </Paper>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
