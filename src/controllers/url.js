const HttpStatus = require('http-status-codes')
const Url = require('../models/url')
const { isEmpty } = require('../functions')

class UrlController {

    constructor() {

    }

    static async getAllUrls(req, res) {

        try {

            urls = await Url.find()

            res.status(HttpStatus.OK).send({ 'urls': urls })

        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ err })
        }
    }
    
    static async getUrl(req, res) {

        try {

            url = await Url.findOne({ 'short_url': req.params.short_url })

            if (isEmpty(url)) {
                return res.status(HttpStatus.BAD_REQUEST).send({ 'info': 'url not found' })
            }
            return res.status(HttpStatus.MOVED_TEMPORARILY).redirect(url.long_url)

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    }
}

module.exports = UrlController