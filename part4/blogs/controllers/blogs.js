const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)    
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', (request, response, next) => {
  const blogID = request.params.id
  Blog
    .findById(blogID)
    .then(blog => {
      if(blog){
        response.status(200).json(blog)
      } else {
        response.status(400).send({error: 'resourse not found'})
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndDelete(request.params.id)
    .then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(
      req.params.id,
      blog,
      {new:true, runValidators:true, context:'query'}
    )
    .then(updatedBlog => {
      res.status(201).json(updatedBlog)
    })
    .catch(error => next(error))
})


module.exports = blogsRouter