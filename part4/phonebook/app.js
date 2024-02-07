const config = require('./utils/config.js')
const express = require('express')
const cors = require('cors')
const personsRouter = require('./controllers/persons.js')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger.js')
const Person = require('./models/person.js')
const mongoose = require('mongoose')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MogoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

//MIDDLEWARES
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.morganLogger)

app.use('/api/persons', personsRouter)

app.get('/', (req, res) => {
  res.send('<h2>Backend say: 404 not Found</h2>')
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(people => {
      res.send(
        `Phonebook has info for ${people.length} people <br>
            ${new Date()}`
      )
    })
    .catch(error => next(error))
})


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


