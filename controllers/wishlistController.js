const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");
// reading all items
async function getWishlists(req, res) {
  try {
    const wishlists = await getDb()
      .collection("wishlists")
      .find(req.query)
      .toArray();
    if (!wishlists) {
      res.status(404).send("wishlists not found");
    }
    res.status(200).send(wishlists);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// creating single item
async function createWishlist(req, res) {
  try {
    const wishlist = req.body;
    const result = await getDb().collection("wishlists").insertOne(wishlist);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading single item
async function getWishlistById(req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const wishlist = await getDb().collection("wishlists").findOne(query);

    if (!wishlist) {
      return res.status(404).send("wishlist not found.");
    }
    res.status(200).send(wishlist);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// updating single item
async function updateWishlist(req, res) {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = {
      $set: { ...req.body },
    };
    const result = await getDb()
      .collection("wishlists")
      .updateOne(filter, updateDoc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// deleting item
async function deletewishlist(req, res) {
  try {
    const result = await getDb()
      .collection("wishlists")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getWishlists,
  createWishlist,
  getWishlistById,
  deletewishlist,
  updateWishlist,
};
