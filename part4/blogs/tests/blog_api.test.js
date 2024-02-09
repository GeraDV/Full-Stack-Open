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
  }, 100000)

  test('The correct number of blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})