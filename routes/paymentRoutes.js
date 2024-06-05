const express = require("express");
const { getPaymentIntent } = require("../controllers/paymentController");
const router = express.Router();

// sending client secrete to client
router.post("/clientsecrete", getPaymentIntent);

// sending all payments infor mation to the client
router.get("/allpayments", (req, res) => {
  console.log("payments ");
});

module.exports = router;
