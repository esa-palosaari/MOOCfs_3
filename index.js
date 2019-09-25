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


/* 
3.3: puhelinluettelon backend step3
Toteuta toiminnallisuus yksittäisen puhelinnumerotiedon näyttämiseen. 
Esim. id:n 5 omaavan numerotiedon url on http://localhost:3001/api/persons/5
Jos id:tä vastaavaa puhelinnumerotietoa ei ole, tulee palvelimen 
vastata asianmukaisella statuskoodilla.
*/

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id ===id)
    if (!person) 
    {
        return res.status(400).json({
            error: 'person missing'
        })
    }
    res.json(person)
})

/*
3.4: puhelinluettelon backend step4
Toteuta toiminnallisuus, jonka avulla puhelinnumerotieto on mahdollista poistaa 
numerotiedon yksilöivään URL:iin tehtävällä HTTP DELETE -pyynnöllä.
Testaa toiminnallisuus Postmanilla tai Visual Studio Coden REST-clientillä.
*/

app.delete('/api/persons/:id', (req, res) => 
{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

console.log('first iteration')