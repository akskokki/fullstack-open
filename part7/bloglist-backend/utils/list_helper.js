const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  counts = lodash.countBy(blogs, 'author')
  authors = Object.keys(counts)
  bestAuthor = authors.reduce((best, author) => {
    return counts[author] > counts[best] ? author : best
  }, authors[0])
  return bestAuthor ? { author: bestAuthor, blogs: counts[bestAuthor] } : undefined
}

const mostLikes = (blogs) => {
  counts = blogs.reduce((result, blog) => {
    result[blog.author] ? result[blog.author] += blog.likes : result[blog.author] = blog.likes
    return result
  }, {})
  authors = Object.keys(counts)
  bestAuthor = authors.reduce((best, author) => {
    return counts[author] > counts[best] ? author : best
  }, authors[0])
  return bestAuthor ? { author: bestAuthor, likes: counts[bestAuthor] } : undefined
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}