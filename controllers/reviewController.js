const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");
// reading all items
async function getreviews(req, res) {
  try {
    const reviews = await getDb()
      .collection("reviews")
      .find()
      .sort({ created_at: -1 })
      .toArray();
    if (!reviews) {
      res.status(404).send("reviews not found");
    }
    res.status(200).send(reviews);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// creating single item
async function createReview(req, res) {
  try {
    const {
      propertyId,
      userId,
      property_title,
      user_name,
      user_image,
      rating,
      comment,
      created_at,
    } = req.body;
    const review = {
      propertyId: new ObjectId(propertyId),
      userId: new ObjectId(userId),
      property_title,
      user_name,
      user_image,
      rating,
      comment,
      created_at,
    };
    console.log(review);
    // const result = await getDb().collection("reviews").insertOne(review);
    // res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading single item
async function getReviewById(req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const review = await getDb().collection("reviews").findOne(query);

    if (!review) {
      return res.status(404).send("review not found.");
    }
    res.status(200).send(review);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// updating single item
async function updateReview(req, res) {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = {
      $set: { ...req.body },
    };
    const result = await getDb()
      .collection("reviews")
      .updateOne(filter, updateDoc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// deleting item
async function deleteReview(req, res) {
  try {
    const result = await getDb()
      .collection("reviews")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getreviews,
  createReview,
  getReviewById,
  deleteReview,
  updateReview,
};
