const { ValidationError } = require('sequelize')

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.errors.map((e) => e.message) })
  }
  res.status(400).json({ error })
}

module.exports = { errorHandler }
