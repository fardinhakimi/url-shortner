
const express = require('express')

require('dotenv').config()

const bodyParser = require('body-parser')
const app  = express()
const cors = require('cors')
const passport      = require('passport')

// connect to mongo_db
require('./db')()

// init passport strategies
require('./passport')(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/',require('./web'))

app.use('/api', require('./api'))


const PORT = process.env.PORT || 8080

app.listen(PORT, (err)=> {
    if(!err){
    console.log(`App running on port:${PORT}`);
    }
})