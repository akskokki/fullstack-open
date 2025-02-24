const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  console.log(req.params)
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  })
  console.log(user)
  user.name = req.body.name
  user.save()
  res.json(user)
})

module.exports = router
