
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

require('dotenv').config()

// connect to mongo_db
require('./db')();

const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("POST to /api/shorten-url {'long_url': long_url_value } to shorten urls!")
})

app.use('/api', require('./api'))

app.listen(PORT, (err)=> {
    if(!err){
    console.log(`App running on port:${PORT}`);
    }
})