const errorHandler = (error, req, res, next) => {
  res.status(400).json({ error })
}

module.exports = { errorHandler }
