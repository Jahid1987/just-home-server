const express = require("express");
const {
  getPaymentIntent,
  savePayment,
} = require("../controllers/paymentController");
const router = express.Router();

// sending client secrete to client
router.post("/clientsecret", getPaymentIntent);
// saving all payments info
router.post("/savepayment", savePayment);
// sending all payments infor mation to the client
router.get("/allpayments", (req, res) => {
  console.log("payments ");
});

module.exports = router;
