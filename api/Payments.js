const express = require('express');
const paymentsRouter = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
paymentsRouter.post("/", async (req, res) => {
    let { amount, id } = req.body
    console.log('payment', amount, id)
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Duck Product",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment successful",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})

module.exports=paymentsRouter