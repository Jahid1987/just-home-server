const express = require("express");
const {
  getreviews,
  createReview,
  getReviewById,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.get("/", getreviews);
router.post("/", createReview);
router.get("/:id", getReviewById);
router.delete("/:id", deleteReview);
router.patch("/:id", updateReview);
module.exports = router;
