const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PvSchema = new Schema({
  url: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    require: true,
  }
})

module.exports = mongoose.model('Pv', PvSchema, 'pv')
