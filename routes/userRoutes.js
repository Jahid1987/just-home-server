const express = require("express");

const {
  createUser,
  getUserByEmail,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:email", getUserByEmail);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
module.exports = router;
