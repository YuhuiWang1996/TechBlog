const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ArticlesSchema = new Schema({
  id: {
    type: String,
    unique: true,
    require: true
  },
  title_en: {
    type: String,
    unique: true,
    require: true
  },
  title: {
    type: String,
    unique: true,
    require: true
  },
  brief: {
    type: String,
    require: false
  },
  doc: {
    type: String,
    require: true
  },
  type: {
    type: String,
  },
  tags: {
    type: Array
  },
  showInHome: {
    type: Boolean,
    require: true,
  },
  showInArticles: {
    type: Boolean,
    require: true,
  },
  createAt: {
    type: Date,
    require: true,
  },
  updateAt: {
    type: Date,
    require: true
  },
  sort: {
    type: Number
  }
})

module.exports = mongoose.model('Article', ArticlesSchema, 'articles')
