const express = require("express");
const {
  getProperties,
  createProperty,
  getPropertyById,
  deleteProperty,
  updateProperty,
  updatePropertyStatus,
  updateAdvertisementStatus,
} = require("../controllers/propertyController");
const authenticateToken = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getProperties);
// ToDo:  only agent role can add property not user/admin/fraud
router.post("/", authenticateToken, verifyRole("agent"), createProperty);
router.get("/:id", authenticateToken, getPropertyById);
router.delete("/:id", authenticateToken, deleteProperty);
router.patch("/:id", authenticateToken, updateProperty);
// this for change property's status. DONE: it will be only for admin route
router.post(
  "/updatestatus",
  authenticateToken,
  verifyRole("admin"),
  updatePropertyStatus
);
router.post(
  "/advertise",
  authenticateToken,
  verifyRole("admin"),
  updateAdvertisementStatus
);
module.exports = router;
