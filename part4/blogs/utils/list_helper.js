const ld = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr, {})
  const {title, author, likes} = favoriteBlog
  return {title, author, likes}
}


const mostBlogs = (blogs) => {
  const authorsBlogs = ld.countBy(blogs, blog => blog.author) //Object
  const arrayAuthors = ld.keys(authorsBlogs)
  const mostBlogger = ld.maxBy(arrayAuthors, author => authorsBlogs[author])
  return {
    author: mostBlogger,
    blogs: authorsBlogs[mostBlogger]
  }
}

const mostLikes = (blogs) => {
  const blogsForAuthor = ld.groupBy(blogs, 'author')
  console.log(blogsForAuthor, '<---------- Blogs for Authors');
  const likesForAuthor = ld.mapValues(blogsForAuthor, blogs => ld.sumBy(blogs, 'likes'))
  console.log(likesForAuthor, '<--------------- Likes for Author');
  const arrayAuthors = ld.keys(likesForAuthor)
  const mostLikesAuthor = ld.maxBy(arrayAuthors, author => likesForAuthor[author])
  console.log(mostLikesAuthor, '<----------------- Most Likes Author');

  return {
    author: mostLikesAuthor,
    likes: likesForAuthor[mostLikesAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}