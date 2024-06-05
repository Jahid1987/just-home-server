const stripe = require("stripe")(process.env.STRIPE_SECRETE);

async function getPaymentIntent(req, res) {
  try {
    const totalAmount = req.body.price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
    });
    if (!paymentIntent) {
      return res.status("404").send("paymentIntent not found");
    }
    res.status(200).send({
      clientSecrete: paymentIntent,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { getPaymentIntent };
