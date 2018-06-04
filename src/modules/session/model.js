'use strict'

const mongoose = require('./db')
const setup = require('../../config/setup');
const Schema = mongoose.Schema

const SessionSchema = new Schema({
  sid: String,
  host: String,
  team: Array
})

const Session = mongoose.model(setup.mongodb.model, SessionSchema)
module.exports = Session