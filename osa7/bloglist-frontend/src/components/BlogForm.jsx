import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = ({ blogFormRef }) => {
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
    } catch {
      dispatch(notify('blog creation failed', 'error'))
    }
  }

  return (
    <Togglable buttonLabel="create new blog" ref={toggleRef}>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="blogFormTitleInput"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid="blogFormAuthorInput"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid="blogFormUrlInput"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button data-testid="blogFormSubmitButton" type="submit">
          create
        </button>
      </form>
    </Togglable>
  )
}

export default BlogForm
