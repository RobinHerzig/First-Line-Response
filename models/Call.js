const mongoose = require('mongoose')

const ResponseSchema = new mongoose.Schema({ 
  apparatus: String,
  tone: String,
  enroute: String,
  arrival: String,
  departure: String,
  quarters: String,
});

const Calls = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  response: {
    type: [ResponseSchema],
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

module.exports = {Call: mongoose.model('calls', Calls), ResponseSchema: mongoose.model('response', ResponseSchema)}