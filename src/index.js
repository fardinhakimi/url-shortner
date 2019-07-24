
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
require("regenerator-runtime/runtime")

// Environment variables

require('dotenv').config()

// Config


app.use(passport.initialize())

require('./db')()
require('./passport')(passport)

// Middleware 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


// Routing 

app.use('/', require('./routes/web'))
app.use('/account/', require('./routes/account'))
app.use('/auth', require('./routes/auth'))
app.use('/api/', require('./routes/api'))


// Server 

const PORT = process.env.PORT || 8080

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`App running on port:${PORT}`);
    }
})

module.exports = app