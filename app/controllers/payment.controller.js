const paymentModel = require('../../db/models/payment.model')
const Helper = require('../helper')
const subscriptionModel = require('../../db/models/subscription.model')
const braintree = require("braintree");
const fs = require('fs')
const { uploadfile } = require('../middlewares')
const multer = require('multer')
const path = require('path')

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BrainTreeMerchantId,
  publicKey: process.env.BrainTreePublicKey,
  privateKey: process.env.BrainTreePrivateKey
});

class Payment {
  static creatPaypalToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
      res.json(response.clientToken);
    });
  }
  static paypalCheckout = (req, res) => {
    Helper.handlingMyFunction(req, res, async (req) => {
      req.user.populate({ path: 'academyDetails', select: ['country'], populate: { path: 'country', select: ['countryName', 'currency'] } })
      const subscription = await Helper.isThisIdExistInThisModel(req.params.subscriptionId, null, subscriptionModel, 'subscription', { path: 'competition', populate: 'country' })
      let currency
      if (subscription.competition.type == 'final') {
        currency = (Helper.isThisIdExistInThisModel(process.env.FinalCompetitionPaymentDataID, null, countryModel, 'country')).currency
      } else {
        currency = subscription.competition.country.currency
      }
      req.body.merchantAccountId = currency + '_merchant'
      req.body.options = {
        submitForSettlement: true
      }
      console.log(req.body)
      gateway.transaction.sale(req.body, (err, result) => {
        if (err) {
          throw err
        }
        if (result.success) {
          console.log(result.transaction)
          const payment = {
            subscription: req.params.subscriptionId,
            paymentWay: 'online',
            amount: result.transaction.amount,
            currency: result.transaction.currencyIsoCode,
            onlinePaymentData: {
              transactionID: result.transaction.id,
              createdAt: result.transaction.createdAt
            }
          }
          if (result.transaction.paymentInstrumentType == 'paypal_account') {
            payment.onlinePaymentData.payerUsedAccount = result.transaction.paypal.payerEmail
          } else {
            payment.onlinePaymentData.payerUsedAccount = result.transaction.creditCard.maskedNumber
          }
          return paymentModel.create(payment)
        } else {
          if (result.transaction) {
            console.log(result.transaction.paymentReceipt.processorResponseCode)
            const e = new Error(result.transaction.paymentReceipt.processorResponseText)
            e.name = 'CastError'
            throw e
          } else {
            const e = new Error(result.message)
            e.name = 'CastError'
            throw e
          }
        }
      });

    }, 'the payment done successfully')
  }
  static addBankReceipt = (req, res) => {
    try {
      let image
      const upload = uploadfile('receipt_photos', ['image/png', 'image/webp', 'image/apng', 'image/gif', 'image/jpeg'])
      const uploadImage = upload.single('photo')
      uploadImage(req, res, async function (e) {
        if (e instanceof multer.MulterError)
          Helper.formatMyAPIRes(res, 500, false, e, e.message + 'its a multer error')
        else if (e) {
          Helper.formatMyAPIRes(res, 500, false, e, e.message)
        }
        else {
          try {
            if (req.file) {
              image = req.file.path.replace('statics\\', '')
              image = image.replace(/\\/g, '/')
              req.body.bankReceiptPaymentData = {}
              req.body.bankReceiptPaymentData.photo = image
            }
            req.body.subscription = req.params.subscriptionId
            req.body.paymentWay = 'bankReceipt'
            const payment = await paymentModel.create(req.body)
            // if (req.user.image != 'defaultuserimage.png') {
            //     fs.unlinkSync(path.join(__dirname, '../../statics/' + req.user.image))
            // }
            Helper.formatMyAPIRes(res, 200, true, { file: req.file, payment }, 'your receipt added successfully wait for acceptance from our support team')
          }
          catch (e) {
            console.log(e)
            if (fs.existsSync(path.join(__dirname, '../../statics/' + image))) {
              fs.unlinkSync(path.join(__dirname, '../../statics/' + image))
            }
            Helper.formatMyAPIRes(res, 500, false, e, e.message)
          }
        }
      })
    } catch (e) {
      console.log(e)
      Helper.formatMyAPIRes(res, 500, false, e, e.message)
    }
  }
  static determineBankReiceiptStatus = (req, res) => {
    Helper.handlingMyFunction(req, res, async (req) => {
      const payment = await Helper.isThisIdExistInThisModel(req.params.paymentId, null, paymentModel, 'payment')
      if (payment.paymentWay != 'bankReceipt') {
        const e = new Error('this payment does not need any decision to take')
        e.name = 'Error'
        throw e
      }
      payment.bankReceiptPaymentData[req.body.decision] = true
      console.log(req.body.decision)
      if (req.body.decision == 'refused') {
        if (req.body.message) {
          payment.bankReceiptPaymentData.rejectionReason = req.body.message
        } else {
          const e = new Error('please enter a rejection reason to inform the academy')
          e.name = 'CastError'
          throw e
        }
      } else if (req.body.decision == 'accepted') {
        payment.amount = req.body.amount
        payment.currency = req.body.currency
      } else {
        const e = new Error('your decision is confusing please just accept or refuse')
        e.name = 'CastError'
        throw e
      }
      payment.userSeen = false
      if (true) { return payment.save() }
    }, 'your decision has been registered successfully')
  }
  static getSubscriptionPayments = (req, res) => {
    Helper.handlingMyFunction(req, res, async (req) => {
      let update = {}
      if (req.user.role.toString() == process.env.academy) {
        update.userSeen = true
      } else {
        update.adminSeen = true
      }
      await paymentModel.updateMany({ subscription: req.params.subscriptionId }, update)
      if (true) { return paymentModel.find({ subscription: req.params.subscriptionId }) }
    }, 'here is all your asked payments')
  }
}
module.exports = Payment