const express = require("express");
const {
  getWishlists,
  createWishlist,
  getWishlistById,
  deletewishlist,
  updateWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.get("/", getWishlists);
router.post("/", createWishlist);
router.get("/:id", getWishlistById);
router.delete("/:id", deletewishlist);
router.patch("/:id", updateWishlist);
module.exports = router;
