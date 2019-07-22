const { Schema, model } = require('mongoose');

const userSchema = new Schema({

  email: {
    type: String,
    index: true,
    unique: true,
    dropDups: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
})

module.exports = model('User', userSchema)