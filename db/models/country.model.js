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
  },
  currency:{
    type:String,
    required:true,
    uppercase: true,
    enum:['EUR', 'AFN', 'XCD', 'ALL', 'AMD', 'AOA', 'VES', 'ARS', 'USD', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'XOF', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BRL', 'BTN', 'NOK', 'BWP', 'BZD', 'CAD', 'CHE', 'CLP', 'XAF', 'CNY', 'COP', 'CRC', 'CUC', 'CVE', 'ANG', 'DJF', 'DKK', 'DZD', 'EGP', 'MAD', 'ERN', 'ETB', 'FJD', 'GEL', 'GBP', 'GHS', 'GIP', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KPW', 'KRW', 'KWD', 'KZT', 'LBP', 'CHF', 'LKR', 'LRD', 'LSL', 'LYD', 'MGA', 'MMK', 'MNT', 'MOP', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'XPF', 'NGN', 'NIO', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'SVC', 'SYP', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'YER', 'ZAR', 'ZMW', 'ZWL', 'SZL', 'MKD', 'PHP', 'AED', 'MDL', 'GMD', 'DOP', 'SDG', 'LAK', 'TWD', 'CZK', 'CDF', 'BSD', 'XAF', 'FKP', 'DKK', 'USD', 'KMF', 'KYD']
  }
})
const countryModel = mongoose.model('countries', CountrySchema)
module.exports = countryModel