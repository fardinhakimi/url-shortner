const HttpStatus = require('http-status-codes')
const Url = require('../models/url')
const { isEmpty, internalServerError } = require('../functions')

class UrlController {
    
    static async getAllUrls(req, res) {

        try {

            const urls = await Url.find()
            
            return res.status(HttpStatus.OK).send({ 'urls': urls })

        } catch (err) {
            return internalServerError(res, [err])
        }
    }
    
    static async getUrl(req, res) {

        try {

            const url = await Url.findOne({ 'short_url': req.params.short_url })

            if (isEmpty(url)) {
                return res.status(HttpStatus.BAD_REQUEST).send({ 'errors': ['url not found'] })
            }
            return res.status(HttpStatus.MOVED_TEMPORARILY).redirect(url.long_url)

        } catch (err) {
            return internalServerError(res, [err])
        }
    }
}

module.exports = UrlController