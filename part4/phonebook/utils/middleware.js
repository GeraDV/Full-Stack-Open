const logger = require('./logger')
const morgan = require('morgan')

morgan.token('person', (req) => {
  return Object.keys(req.body).length? JSON.stringify(req.body) : ' '
})

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('---')
  next()
}


const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :person')

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

module.exports = {requestLogger, morganLogger, unknownEndpoint, errorHandler}