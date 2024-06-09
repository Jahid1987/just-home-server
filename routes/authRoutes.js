const express = require("express");
const { createJwt } = require("../controllers/authController");

const router = express.Router();

router.post("/createjwt", createJwt);

module.exports = router;
