import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blog) => {
  const blogUrl = baseUrl + '/' + blog.id

  const likedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const response = await axios.put(blogUrl, likedBlog)
  return response.data
}

const remove = async blogId => {
  const blogUrl = `${baseUrl}/${blogId}`
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(blogUrl, config)
}

//eslint-disable-next-line
export default { getAll, setToken, create, addLike, remove }