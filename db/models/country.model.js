const mongoose = require('mongoose')
const CountrySchema = mongoose.Schema({
  countryName: {
    type: String,
    unique: true,
    required: [, true, 'please enter the name of the country you want to add']
  },
  adminstrationFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  membershipFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  solodancerFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  duoOrTriodancerFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  groupdancerFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  solosingerFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  duoOrTriosingerFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  groupsingerFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  solomusicianFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  duoOrTriomusicianFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  },
  groupmusicianFees: {
    type: Number,
    required: [true, 'this fees is required to manage the Subscriber academy fees']
  }
})
const countryModel = mongoose.model('countries', CountrySchema)
module.exports = countryModel