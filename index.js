const express = require('express')
const app = express()

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-532532",
        id: 4
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 5
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
})

app.get('/persons', (req, res) => {
    res.json(persons)
})


// 3.2 https://fullstackopen.com/osa3/node_js_ja_express#tehtavia
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

console.log('first iteration')