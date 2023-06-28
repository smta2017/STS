const paymentModel=require('../../db/models/payment.model')
const Helper = require('../helper')

const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "gcvpgyjxygbm7m7t",
  publicKey: "y4qntcy9xctngxxv",
  privateKey: "2d9ac4ab7d82a84b337c6487694d3d02"
});

class Payment{
static creatPaypalToken=(req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
        res.json(response.clientToken);
      });
}
static paypalCheckout=(req,res)=>{
    req.user.populate({path:'academyDetails',select:['country'],populate:{path:'country',select:['countryName','currency']}})
    
}
}
module.exports=Payment