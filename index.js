require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// GET all persons
app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => res.json(persons))
        .catch(error => next(error))
})

// GET one person
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) res.json(person)
            else res.status(404).end()
        })
        .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

// POST new person
app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body

    const person = new Person({ name, number })

    person.save()
        .then(savedPerson => res.json(savedPerson))
        .catch(error => next(error))
})

// PUT (update person)
app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        {
            new: true,
            runValidators: true,
            context: 'query'
        }
    )
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))
})

// /info
app.get('/info', (req, res, next) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date()
            res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
        })
        .catch(error => next(error))
})

// Static frontend
app.use(express.static(path.join(__dirname, 'dist')))

// Error handler
app.use((error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    next(error)
})


// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
