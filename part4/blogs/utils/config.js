require ('dotenv').config()

const PORT = process.env.PORT

const NODE_ENV = process.env.NODE_ENV

const MONGODB_URI = NODE_ENV === 'test'
                  ? process.env.MONGODB_URI
                  : process.env.TEST_MOGODB_URI

module.exports = {PORT, MONGODB_URI, NODE_ENV}