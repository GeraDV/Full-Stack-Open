require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')

const app = express()

//Morgan
morgan.token('person', (req) => {
  return Object.keys(req.body).length? JSON.stringify(req.body) : ' '
})

//MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))



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

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(people => {
      res.json(people)
    })
    .catch(error => {
      console.log('error getting all persons from MongoDB', error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(pers => {
      if(pers){
        res.json(pers)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(unknownEndpoint)
app.use(errorHandler)



// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Start in Port ${PORT} --------------------->`)
})
