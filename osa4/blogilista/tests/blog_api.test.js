const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('returned blogs have attribute id', async () => {
    response = await api.get('/api/blogs')
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
  describe('new blog', () => {
    test('can be added', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const newBlog = {
        title: 'testBlog',
        author: 'testAuthor',
        url: 'testUrl',
        likes: 42
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
    })
    test('contents are correct', async () => {
      const newBlog = {
        title: 'testBlog',
        author: 'testAuthor',
        url: 'testUrl',
        likes: 42
      }

      const response = await api.post('/api/blogs').send(newBlog)

      const blogInDb = await Blog.findById(response.body.id)

      expect(blogInDb.title).toEqual('testBlog')
      expect(blogInDb.author).toEqual('testAuthor')
      expect(blogInDb.url).toEqual('testUrl')
      expect(blogInDb.likes).toEqual(42)
    })

    test('added without likes property has 0 likes', async () => {
      const newBlogWithoutLikes = {
        title: 'the Unloved Blog',
        author: 'who even cares',
        url: 'theloneliestblog.com'
      }

      const response = await api.post('/api/blogs').send(newBlogWithoutLikes)

      expect(response.body.likes).toEqual(0)
    })

    test('returns 400 when added without title property', async () => {
      const newBlogWithoutTitle = {
        author: 'testAuthor',
        url: 'testUrl',
        likes: 42
      }

      await api
        .post('/api/blogs')
        .send(newBlogWithoutTitle)
        .expect(400)
    })

    test('returns 400 when added without url property', async () => {
      const newBlogWithoutUrl = {
        title: 'testTitle',
        author: 'testAuthor',
        likes: 42
      }

      await api
        .post('/api/blogs')
        .send(newBlogWithoutUrl)
        .expect(400)
    })
  })
  test('specific blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const idToDelete = blogsAtStart[0].id

    await api.delete(`/api/blogs/${idToDelete}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
  })

  test('specific blog can be updated and contains correct values after updating', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const idToUpdate = blogsAtStart[0].id

    const updatedBlog = {
      title: 'updatedTitle',
      author: 'updatedAuthor',
      url: 'updatedUrl',
      likes: 999
    }

    await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(updatedBlog)
      .expect(200)

    updatedBlog.id = idToUpdate

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toContainEqual(updatedBlog)
  })
})

describe('when there is initially one user saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('SpookyScarySkeletons', 10)
    const user = new User({ username: 'spoop', name: 'mr skeltal', passwordHash })

    await user.save()
  })

  test('user list is returned in json form', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('adding new user', () => {
    test('succeeds with valid data', async () => {
      const newUser = { username: 'newUsername', name: 'newName', password: 'newPass' }
      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })
    test('fails with missing username or password', async () => {
      const usernamelessUser = { password: 'testPass' }
      const passwordlessUser = { username: 'testUsername' }

      let response = await api
        .post('/api/users')
        .send(usernamelessUser)
        .expect(400)
      expect(response.body.error).toContain('`username` is required')

      response = await api
        .post('/api/users')
        .send(passwordlessUser)
        .expect(400)
      expect(response.body.error).toContain('`password` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(1)
    })
    test('fails with too short username or password', async () => {
      const shortnameUser = { username: 'a', password: 'testPass' }
      const shortpassUser = { username: 'testUsername', password: 'a' }

      let response = await api
        .post('/api/users')
        .send(shortnameUser)
        .expect(400)
      expect(response.body.error).toContain('shorter than the minimum allowed length')

      response = await api
        .post('/api/users')
        .send(shortpassUser)
        .expect(400)
      expect(response.body.error).toContain('shorter than the minimum allowed length')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(1)
    })
    test('fails with non-unique username', async () => {
      const uncreativeUser = { username: 'spoop', password: 'SPOOKIESTskeletons' }

      let response = await api
        .post('/api/users')
        .send(uncreativeUser)
        .expect(400)
      expect(response.body.error).toContain('expected `username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(1)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})