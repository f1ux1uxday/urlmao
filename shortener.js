const mongoose = require('mongoose')

const Schema = mongoose.Schema

const urlmaoSchema = new Schema({
  url: String,
  urlmao: String,
})

const Model = mongoose.model('urlBank', urlmaoSchema)

module.exports = Model
