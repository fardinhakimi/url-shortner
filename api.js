const router = require('express').Router()
const shortid = require('shortid')
const HttpStatus = require('http-status-codes');
const { check, validationResult } = require('express-validator');
const Url = require('./models/url')
const { isEmpty } = require('./functions')

router.get('/', async function (req, res) {
    try {

        urls = await Url.find()

        res.status(HttpStatus.OK).send({ 'urls': urls })

    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ err })
    }
})

router.post('/shorten-url',
    [
        check('long_url').isURL().withMessage('must contain a valid url')
    ],
    async (req, res) => {

        const errors = validationResult(req)

        if (errors.isEmpty()) {

            const { long_url } = req.body

            try {

                url = await Url.findOne({ 'long_url': long_url })

                if (isEmpty(url)) {

                    url = new Url(
                        {
                            'long_url': long_url,
                            'short_url': shortid.generate()
                        }
                    )

                    url = await url.save()
                }

            } catch (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
            }

            res.status(HttpStatus.CREATED).send({ 'url': url })
        }

        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errors: errors.array() })
    })

router.get('/:short_url', async (req, res) => {

    try {

        url = await Url.findOne({ 'short_url': req.params.short_url })

        if (isEmpty(url)) {
            res.status(HttpStatus.BAD_REQUEST).send({ 'info': 'url not found' })
        }
        res.status(HttpStatus.MOVED_TEMPORARILY).redirect(url.long_url)

    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
})

module.exports = router