const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./test_helper.js')

const api = supertest(app)

const initialBlogs = helper.initialBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs
    .map(blog => new Blog({
      title: blog.title,
      author: blog.author || 'unknown',
      url: blog.url,
      likes: blog.likes || 0
    }))
  const promises = blogObjects.map(blog => blog.save())
  await Promise.all(promises)
})


describe('GET/api', () => {
  test('responds with json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('The correct number of blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
  })

  test('The field "_id" is returned as "id"', async () => {
    const allBlogs = await api.get('/api/blogs')
    const anyBlog = allBlogs.body[0]
    expect(anyBlog).toHaveProperty('id')
  })

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with 404 if blog not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })
})

describe('POST/api', () => {
  test('a valid blog can be added', async () => {
    const blog = {
      title: "Software Testing",
      author: "Ana Lopez",
      url: "https://blog/testing",
      likes: 20
    }

    await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)  //Created
    .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(initialBlogs.length+1)

    const titles = allBlogs.map(blog => blog.title)
    expect(titles).toContain('Software Testing')
  })

  test('a blog without url or title is not added', async () => {
    const blogWithoutTitle = {
      author: "Ana Lopez",
      url: "https://blog/testing"
    }
    const blogWithoutUrl = {
      title: "Software Testing",
      author: "Ana Lopez"
    }

    await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)  //Bad Request
    
    await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)  //Bad Request

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(initialBlogs.length)
  })

  test('If the "likes" field is not defined, it will start with 0 likes', async () => {
    await Blog.deleteMany({})

    const blog = {
      title: "Software Testing",
      author: "Ana Lopez",
      url: "https://blog/testing"
    }

    await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)  //Created
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(1)

    const addedBlog = response.body[0]
    expect(addedBlog).toHaveProperty('likes')
    expect(addedBlog.likes).toBe(0)
  })

})

describe('DELETE/api', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('PUT/api', () => {
  test('succeeds with status 201 if blog id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newLikes = 88

    const changes = {
      likes: newLikes
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(changes)
      .expect(201)

    const blogAtEnd = await api.get(`/api/blogs/${blogToUpdate.id}`)
    expect(blogAtEnd.body.likes).toEqual(newLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})