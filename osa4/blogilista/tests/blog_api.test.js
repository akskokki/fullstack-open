const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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

test('new blog can be added', async () => {
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

test('new blog contents are correct', async () => {
  const newBlog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 42
  }

  const response = await api.post('/api/blogs').send(newBlog)
  newBlog.id = response.body.id

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toContainEqual(newBlog)
})

test('new blog added without likes property has 0 likes', async () => {
  const newBlogWithoutLikes = {
    title: 'the Unloved Blog',
    author: 'who even cares',
    url: 'theloneliestblog.com'
  }

  const response = await api.post('/api/blogs').send(newBlogWithoutLikes)

  expect(response.body.likes).toEqual(0)
})

test('new blog returns 400 when added without title property', async () => {
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

test('new blog returns 400 when added without url property', async () => {
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


afterAll(() => {
  mongoose.connection.close()
})