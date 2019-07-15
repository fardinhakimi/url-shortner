const mongoose = require('mongoose');

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

module.exports = mongoose.model('Url', UrlSchema)