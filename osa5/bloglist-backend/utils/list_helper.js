const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, b) => total += b.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, b) => fav = b.likes > fav.likes ? b : fav, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
