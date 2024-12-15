import { useSelector } from 'react-redux'
import Blog from '../Blog'
import BlogForm from '../BlogForm'

const BlogsView = ({ blogs }) => {
  const user = useSelector((state) => state.user)

  return (
    <div>
      <BlogForm />
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default BlogsView
