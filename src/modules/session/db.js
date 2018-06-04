'use strict'
const mongoose = require('mongoose')
const setup = require('../../config/setup.js');

mongoose.connect(setup.mongodb.url)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', (callback) => {
  console.log('Connection Succeeded')
})

module.exports = mongoose