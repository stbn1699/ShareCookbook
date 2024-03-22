const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001
const db = require('./PublicationQuerries')
const userQuerries = require('./UserQuerries')

const corsOptions = {
    origin: ['http://sharecookbook.ebasson.fr', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
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
app.get('/publications/getAll', db.getPublications);
app.get('/publications/getPublicationById/:id', db.getPublicationById);

// user querries
app.get('/user/check', userQuerries.checkUser);
app.post('/user/add', userQuerries.addUser);
app.post('/user/login', userQuerries.loginUser);
app.post('/user/toggleLike', userQuerries.toggleLike);
app.post('/user/haveUserLiked', userQuerries.userLikedPublication);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})