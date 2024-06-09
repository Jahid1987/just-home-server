const express = require("express");

const {
  createUser,
  getUserByEmail,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:email", getUserByEmail);
router.delete("/:id", authenticateToken, deleteUser);
router.patch("/:id", authenticateToken, verifyRole("admin"), updateUser);
module.exports = router;
