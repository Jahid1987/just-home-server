const express = require("express");
const {
  getreviews,
  createReview,
  getReviewByEmail,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getreviews);
router.post("/", authenticateToken, createReview);
router.get("/:email", getReviewByEmail);
router.delete("/:id", authenticateToken, deleteReview);
router.patch("/:id", updateReview);
module.exports = router;
