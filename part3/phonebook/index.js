const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const app = express();

morgan.token('person', (req) => {
    return Object.keys(req.body).length? JSON.stringify(req.body) : ' '
})



//MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/', (req, res) => {
    res.send('<h2>Hello from backend API </h2>')
})

app.get('/info', (req, res) => {
    res.send(
        `Phonebook has info for ${persons.length} people <br>
        ${new Date()}`
    )
})

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    person? res.json(person) : res.status(404).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body.name){
        return res.status(400).json({
            error: "missing name data"
        })
    }

    if(!body.number){
        return res.status(400).json({
            error: "missing number data"
        })
    }

    if(persons.find(p => p.name === body.name)){
        return res.status(409).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.trunc((Math.random()*10000))
    }
    persons = persons.concat(person)
    res.json(person)

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Start in Port ${PORT} --------------------->`);
})