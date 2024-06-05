const express = require("express");

const {
  getOffers,
  createOffer,
  getOfferById,
  deleteOffer,
  updateOffer,
} = require("../controllers/offerController");

const router = express.Router();

router.get("/", getOffers);
router.post("/", createOffer);
router.get("/:id", getOfferById);
router.delete("/:id", deleteOffer);
router.patch("/:id", updateOffer); // TO DO: this will be secured route only for agent role
module.exports = router;
