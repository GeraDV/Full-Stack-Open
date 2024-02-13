const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)    
})

blogsRouter.get('/:id', async (request, response) => {
  const blogID = request.params.id
  const blog = await Blog.findById(blogID)
  if(blog){
    response.status(200).json(blog)
  } else {
    response.status(404).send({error: 'resourse not found'})
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author || 'unknown',
    likes: body.likes || 0
  })
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blogToUpdate = await Blog.findById(req.params.id)
  const blogUpdated = {
    title: body.title || blogToUpdate.title,
    author: body.author || blogToUpdate.author,
    url: body.url || blogToUpdate.url,
    likes: body.likes || blogToUpdate.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      req.params.id,
      blogUpdated,
      {new:true, runValidators:true, context:'query'}
    )

  res.status(201).json(updatedBlog)
})


module.exports = blogsRouter