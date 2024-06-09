const { getDb } = require("../db/connection");
const jwt = require("jsonwebtoken");
async function createJwt(req, res) {
  try {
    const userEmail = req.body;
    const token = jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRETE, {
      expiresIn: "1h",
    });
    res.send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { createJwt };
