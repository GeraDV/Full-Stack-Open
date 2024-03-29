const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const Blog = require('./models/blogs')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

console.log(config.MONGODB_URI, '<----------- MONGODB_URI');
const mongoUrl = config.MONGODB_URI
console.log('connecting to...', mongoUrl);
mongoose.connect(mongoUrl)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((error) => logger.error('Error connecting to database', error))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (req, res) => {
  res.send('<h1>Backend is working</h1>')
})

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandle)

module.exports = app