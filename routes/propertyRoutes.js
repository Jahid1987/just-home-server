const express = require("express");
const {
  getProperties,
  createProperty,
  getPropertyById,
  deleteProperty,
  updateProperty,
  updatePropertyStatus,
} = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getProperties);
// ToDo:  only agent role can add property not user/admin/fraud
router.post("/", createProperty);
router.get("/:id", getPropertyById);
router.delete("/:id", deleteProperty);
router.patch("/:id", updateProperty);
// this for change property's status. TO DO: it will be only for admin route
router.post("/updatestatus", updatePropertyStatus);
module.exports = router;
