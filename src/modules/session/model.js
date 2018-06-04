'use strict'

const mongoose = require('./db')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
  sid: String,
  host: String
})

const Session = mongoose.model('Session', SessionSchema)
module.exports = Session