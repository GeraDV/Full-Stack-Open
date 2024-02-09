const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')

const api = supertest(app)

const initialBlogs = [
  {
    title: "Introducción a JavaScript",
    author: "Juan Pérez",
    url: "https://blog/javascript",
    likes: 20
  },
  {
    title: "Desarrollo web con React",
    author: "Richard Nilson",
    url: "https://blog/react",
    likes: 35
  },
  {
    title: "Python para principiantes",
    author: "Fito Paez",
    url: "https://blog/python",
    likes: 15
  },
  {
    title: "Introducción a Node.js",
    author: "Laura Sánchez",
    url: "https://blog/nodejs",
  },
  {
    title: "Programación orientada a objetos",
    author: "Boogie",
    url: "https://blog/oop",
    likes: 30
  },
  {
    title: "Diseño de interfaces de usuario",
    author: "Ana Lopez",
    url: "https://blog/ui-design",
    likes: 25
  },
  {
    title: "Algoritmos y estructuras de datos",
    url: "https://blog/algorithms",
  }
]

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

    const response = await api.get('/api/blogs')
    const allBlogs = response.body
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

    const response = await api.get('/api/blogs')
    const allBlogs = response.body
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

afterAll(() => {
  mongoose.connection.close()
})