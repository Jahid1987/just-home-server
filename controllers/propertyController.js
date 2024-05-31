const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

async function getProperties(req, res) {
  try {
    const properties = await getDb().collection("properties").find().toArray();
    if (!properties) {
      res.status(404).send("properties not found");
    }
    res.status(200).send(properties);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// creating single item
async function createProperty(req, res) {
  try {
    const property = req.body;
    const result = await getDb().collection("properties").insertOne(property);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// reading single item
async function getPropertyById(req, res) {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const property = await getDb().collection("properties").findOne(query);

    if (!property) {
      return res.status(404).send("property not found.");
    }
    res.status(200).send(property);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
async function updateProperty(req, res) {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = {
      $set: { ...req.body },
    };
    const result = await getDb()
      .collection("properties")
      .updateOne(filter, updateDoc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// deleting item
async function deleteProperty(req, res) {
  try {
    const result = await getDb()
      .collection("properties")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getProperties,
  createProperty,
  getPropertyById,
  deleteProperty,
  updateProperty,
};
