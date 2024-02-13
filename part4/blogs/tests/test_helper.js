const Blog = require('../models/blogs')

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

const nonExistingId = async () => {
  const blog = new Blog({
      title: "Software Testing",
      url: "https://blog/testing",
      author: "Ana Lopez",
      likes: 29
  })

  await blog.save()
  const blogId = blog._id.toString()
  await Blog.deleteOne({_id: blog._id})

  return blogId
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {initialBlogs, nonExistingId, blogsInDb}