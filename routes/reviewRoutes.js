const express = require("express");
const {
  getreviews,
  createReview,
  getReviewByEmail,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/", getreviews);
router.post("/", createReview);
router.get("/:email", getReviewByEmail);
router.delete("/:id", deleteReview);
router.patch("/:id", updateReview);
module.exports = router;
