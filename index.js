const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Morgan logging with custom token
morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// In-memory data
let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

// Info route
app.get('/info', (req, res) => {
    const total = persons.length
    const date = new Date()
    res.send(`<p>Phonebook has info for ${total} people</p><p>${date}</p>`)
})

// Get all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Get person by ID
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// Delete person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

// Generate random ID
const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}

// Add new person
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    const nameExists = persons.some(p => p.name === body.name)
    if (nameExists) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    res.json(newPerson)
})

// Serve static frontend from Vite build (MUST BE LAST)
app.use(express.static(path.join(__dirname, 'dist')))
// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
// })

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
