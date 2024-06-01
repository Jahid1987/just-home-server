const express = require("express");
const { getDb } = require("../db/connection");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cities = await getDb().collection("cities").find().toArray();
    if (!cities) {
      return res.status(404).send("Cities are not found");
    }
    res.status(200).send(cities);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
