const { getDb } = require("../db/connection");

async function createUser(req, res) {
  try {
    const isExist = await getDb()
      .collection("users")
      .findOne({ email: req.body.email });
    if (isExist) {
      return res.status(409).send("This email is already exist.");
    }
    const result = await getDb().collection("users").insertOne(req.body);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { createUser };
