const router = require('express').Router()

const { Blog, User } = require('../models')
const { tokenExtractor } = require('./middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
  })
  res.json(blog)
})

const findBlog = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.put('/:id', findBlog, async (req, res) => {
  req.blog.likes = req.body.likes
  req.blog.save()
  res.json(req.blog)
})

router.delete('/:id', tokenExtractor, findBlog, async (req, res) => {
  if (req.decodedToken.id !== req.blog.userId) {
    return res.status(401).json({ error: 'insufficient permissions' })
  }
  if (req.blog) await req.blog.destroy()
  res.status(204).end()
})

module.exports = router
