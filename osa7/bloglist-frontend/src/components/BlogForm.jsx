import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { Box, Button, TextField } from '@mui/material'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const toggleRef = useRef()

  const addBlog = async (event) => {
    try {
      event.preventDefault()

      dispatch(createBlog(title, author, url))

      toggleRef.current.toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(notify('blog created!', 'info'))
    } catch (e) {
      dispatch(notify('blog creation failed', 'error'))
    }
  }

  return (
    <Togglable buttonLabel="create new blog" ref={toggleRef}>
      <form onSubmit={addBlog}>
        <Box sx={{ my: 1 }}>
          <TextField
            size="small"
            label="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Box>
        <Box sx={{ my: 1 }}>
          <TextField
            size="small"
            label="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Box>
        <Box sx={{ my: 1 }}>
          <TextField
            size="small"
            label="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Box>
        <Button
          variant="contained"
          data-testid="blogFormSubmitButton"
          type="submit"
        >
          create
        </Button>
      </form>
    </Togglable>
  )
}

export default BlogForm
