const { getDb } = require("../db/connection");

const stripe = require("stripe")(process.env.STRIPE_SECRETE);
// creating payment intent and sending to client
async function getPaymentIntent(req, res) {
  try {
    const totalAmount = req.body.price * 100;
    const response = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
    });

    if (!response) {
      return res.status("404").send("paymentIntent not found");
    }

    res.status(200).send({
      clientSecret: response.client_secret,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// saving payment inofo into payments collection
async function savePayment(req, res) {
  try {
    const payment = req.body;
    const result = await getDb().collection("payments").insertOne(payment);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
module.exports = { getPaymentIntent, savePayment };
