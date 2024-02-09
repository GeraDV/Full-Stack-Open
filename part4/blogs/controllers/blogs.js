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

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blogID = request.params.id
    const blog = await Blog.findById(blogID)
    if(blog){
      response.status(200).json(blog)
    } else {
      response.status(400).send({error: 'resourse not found'})
    }
  }catch(exception){
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body
    const blog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author || 'unknown',
      likes: body.likes || 0
    })
    const result = await blog.save()
    response.status(201).json(result)
  }catch(exception){
    next(exception)
  }
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