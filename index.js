const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

/*
3.5: puhelinluettelon backend step5
Laajenna backendia siten, että uusia puhelintietoja on 
mahdollista lisätä osoitteeseen http://localhost:3001/api/persons tapahtuvalla 
HTTP POST -pyynnöllä.
Generoi uuden puhelintiedon tunniste funktiolla 
Math.random. Käytä riittävän isoa arvoväliä, jotta 
arvottu id on riittävän suurella todennäköisyydellä 
sellainen, joka ei ole jo käytössä.
*/

/*
3.6: puhelinluettelon backend step6

Tee uuden numeron lisäykseen virheiden käsittely. Pyyntö ei saa onnistua, jos
    nimi tai numero puuttuu
    lisättävä nimi on jo luettelossa
Vastaa asiaankuuluvalla statuskoodilla ja liitä vastaukseen mukaan myös tieto, 
joka kertoo virheen syyn, esim:
{ error: 'name must be unique' }
*/

const randomId = () => {
    return Math.floor(Math.random()*Number.MAX_SAFE_INTEGER)
}

app.post('/persons', (request, response) =>
{
    const body = request.body
    if (!body.name) 
    {
        return response.status(400).json(
            {
                error: 'name missing'
            }
        )
    }

    if (!body.number)
    {
        return response.status(400).json(
            {
                error: 'number missing'
            }
        )
    }

    if (persons.find(function(element) {
        return element.name===body.name
    } )) 
    {
        return response.status(400).json(
            {
                error: 'name must be unique'
            }
        )
    }

    const person = 
    {
        name: body.name,
        number: body.number,
        id: randomId()
    }

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

console.log('first iteration')