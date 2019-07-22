const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("POST to /api/shorten-url {'long_url': long_url_value } to shorten urls!")
})

module.exports = router