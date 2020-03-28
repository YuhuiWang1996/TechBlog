const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ConfigSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  value: {
    type: String,
    require: false
  },
})

module.exports = mongoose.model('Config', ConfigSchema, 'config')
