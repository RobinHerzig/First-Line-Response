const mongoose = require('mongoose')

const calls = new mongoose.Schema({
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  business: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  type: {
    type: String,
  },
  callNotes: {
    type: Array,
  },
  apparatus: {
    type: Array,
  },
  first: {
    type: String,
  },
  last: {
    type: String,
  },
  phone: {
    type: String,
  },

})

module.exports = mongoose.model('calls', calls)