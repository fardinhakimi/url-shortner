const mongoose = require('mongoose')

const { isValidUrl } = require('../functions').default

const UrlSchema = new mongoose.Schema({
  long_url: {
    type: String,
    unique: true,
  },
  short_url: {
    type: String,
    unique: true
  }
})

UrlSchema.methods.getLongUrl = function () {
  return this.long_url
}

UrlSchema.methods.getCombinedUrl = function (callback) {
  callback(null, this.long_url + ':' + this.short_url)
}

UrlSchema.methods.validateObject = function () {

  return new Promise((resolve, reject) => {

    if (isValidUrl(this.long_url)) {
      resolve(true)
    }

    reject(new Error("Invalid long_url provided."))

  })
}

module.exports = mongoose.model('Url', UrlSchema)