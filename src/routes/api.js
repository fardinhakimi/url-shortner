const router = require('express').Router()
const shortid = require('shortid')
const HttpStatus = require('http-status-codes')
const { check, validationResult } = require('express-validator')
const Url = require('../models/url')
const { isEmpty } = require('../functions')
const UrlController = require('../controllers/url')

router.get('/', UrlController.getAllUrls)
router.get('/:short_url', UrlController.getUrl)
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

module.exports = router