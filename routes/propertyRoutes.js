const express = require("express");
const {
  getProperties,
  createProperty,
  getPropertyById,
  deleteProperty,
  updateProperty,
} = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getProperties);
router.post("/", createProperty);
router.get("/:id", getPropertyById);
router.delete("/:id", deleteProperty);
router.patch("/:id", updateProperty);
module.exports = router;
