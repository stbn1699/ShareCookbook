const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001
const db = require('./queries')
const userQuerries = require('./UserQuerries')

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

//publications querries
app.get('/publications/getAll', db.getPublications)

// user querries
app.get('/user/check', userQuerries.checkUser)
app.post('/user/add', userQuerries.addUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})