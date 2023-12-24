const mongoose = require('mongoose')
const OnlinePaymentSchema = mongoose.Schema({
   transactionID: {
      type: String,
      required: [true, 'what is this transactionID'],
      trim: true
   },
   payerUsedAccount: {
      type: String,
      required: true,
      trim: true
   },
   createdAt:{
      type:Date,
      required:[true,'what is the time of this tansaction']
   }
})
const BankReceiptPaymentSchema = mongoose.Schema({
   photo: {
      type: String,
      required: [true, 'where is the receipt photo'],
      trim: true
   },
   accepted: {
      type: Boolean,
      default:false,
      validate:function(value){
         if(value&&this.refused){
            const e = new Error('that is very confusing did you refuse or accept the receipt')
            e.name = 'ValidationError'
            throw e
         }
      }
   },
   refused: {
      type: Boolean,
      default:false,
       validate:function(value){
         if(value&&this.accepted){
            const e = new Error('that is very confusing did you refuse or accept the receipt')
            e.name = 'ValidationError'
            throw e
         }
      }
   },
   rejectionReason:{
      type:String,
      required:[function(){return this.refused},'please enter your rejection reason']
   }
})
const PaymentSchema = mongoose.Schema({
   subscription: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, 'this payment for what?'],
      trim: true
   },
   paymentWay: {
      type: String,
      required: [true, 'what is the used way for this payment'],
      enum: ['online', 'bankReceipt']
   },
   amount: {
      type: Number,
      required: [function(){return (this.paymentWay=='online'||(this.paymentWay=='bankReceipt'&&this.bankReceiptPaymentData.accepted))},'what is the amount of this payment'],
      min: 0,
   },
   currency: {
      type: String,
      required: [function(){return (this.paymentWay=='online'||(this.paymentWay=='bankReceipt'&&this.bankReceiptPaymentData.accepted))},'what is the curreny used in this payment'],
      uppercase: true,
      enum: ['EUR', 'AFN', 'XCD', 'ALL', 'AMD', 'AOA', 'VES', 'ARS', 'USD', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'XOF', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BRL', 'BTN', 'NOK', 'BWP', 'BZD', 'CAD', 'CHE', 'CLP', 'XAF', 'CNY', 'COP', 'CRC', 'CUC', 'CVE', 'ANG', 'DJF', 'DKK', 'DZD', 'EGP', 'MAD', 'ERN', 'ETB', 'FJD', 'GEL', 'GBP', 'GHS', 'GIP', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KPW', 'KRW', 'KWD', 'KZT', 'LBP', 'CHF', 'LKR', 'LRD', 'LSL', 'LYD', 'MGA', 'MMK', 'MNT', 'MOP', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'XPF', 'NGN', 'NIO', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'SVC', 'SYP', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VND', 'VUV', 'WST', 'YER', 'ZAR', 'ZMW', 'ZWL', 'SZL', 'MKD', 'PHP', 'AED', 'MDL', 'GMD', 'DOP', 'SDG', 'LAK', 'TWD', 'CZK', 'CDF', 'BSD', 'XAF', 'FKP', 'DKK', 'USD', 'KMF', 'KYD']
   },
   onlinePaymentData: {
      type: OnlinePaymentSchema,
      required:[function(){return this.paymentWay=='online'},'where is this online payment data']
   },
   bankReceiptPaymentData:{
      type: BankReceiptPaymentSchema,
      required:[function(){return this.paymentWay=='bankReceipt'},'where is this  bank receipt payment photo']
   },
   adminSeen:{
      type:Boolean,
      default:false
   },
   userSeen:{
      type:Boolean,
      default:true
   },
   date:{
      type:Date,
      default:new Date()
   }
})
const paymentModel = mongoose.model('payments', PaymentSchema)
module.exports = paymentModel