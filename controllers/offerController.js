const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");
// reading all items
async function getOffers(req, res) {
  try {
    const offers = await getDb()
      .collection("offers")
      .find(req.query)
      .sort({ created_at: -1 })
      .toArray();
    if (!offers) {
      res.status(404).send("offers not found");
    }
    res.status(200).send(offers);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// creating single item
async function createOffer(req, res) {
  try {
    const offer = req.body;
    const result = await getDb().collection("offers").insertOne(offer);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading single item
async function getOfferById(req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const offer = await getDb().collection("offers").findOne(query);

    if (!offer) {
      return res.status(404).send("offer not found.");
    }
    res.status(200).send(offer);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// updating single item
async function updateOffer(req, res) {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = {
      $set: { ...req.body },
    };
    const result = await getDb()
      .collection("offers")
      .updateOne(filter, updateDoc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// deleting item
async function deleteOffer(req, res) {
  try {
    const result = await getDb()
      .collection("offers")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getOffers,
  createOffer,
  getOfferById,
  deleteOffer,
  updateOffer,
};
