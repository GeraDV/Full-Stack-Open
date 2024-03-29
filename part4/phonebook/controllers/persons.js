const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
  Person
    .find({})
    .then(people => {
      res.json(people)
    })
})

personsRouter.get('/:id', (req, res, next) => {
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

personsRouter.post('/', (req, res, next) => {
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

personsRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(
    req.params.id,
    person,
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (req, res, next) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = personsRouter