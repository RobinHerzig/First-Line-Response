const mongoose = require('mongoose')

const ApparatusSchema = new mongoose.Schema({ 
  apparatus: String,
  tone: String,
  enroute: String,
  arrival: String,
  departure: String,
  quarters: String,
});

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
    type: [ApparatusSchema],
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