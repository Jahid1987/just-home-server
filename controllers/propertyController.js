const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

async function getProperties(req, res) {
  const limit = parseInt(req.query.limit);
  let query = {};

  // sending limit from home page
  if (!req.query.limit) {
    query = req.query;
  }
  try {
    const properties = await getDb()
      .collection("properties")
      .find(query)
      .limit(limit)
      .toArray();
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
    // pipeline for single data with revies and reviewer
    const pipeline = [
      {
        $match: { _id: new ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "propertyId",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "reviews.reviewr_email",
          foreignField: "email",
          as: "reviewer",
        },
      },
      {
        $unwind: {
          path: "$reviewer",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          details: { $first: "$details" },
          price_range: { $first: "$price_range" },
          location: { $first: "$location" },
          image: { $first: "$image" },
          agentId: { $first: "$agentId" },
          verification_status: { $first: "$verification_status" },
          reviews: {
            $push: {
              rating: "$reviews.rating",
              comment: "$reviews.comment",
              user_name: "$reviewer.name",
              user_image: "$reviewer.image",
            },
          },
        },
      },
      {
        $addFields: {
          reviews: {
            $cond: {
              if: { $eq: ["$reviews", [{}]] },
              then: [],
              else: "$reviews",
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "agentId",
          foreignField: "_id",
          as: "agent",
        },
      },
      {
        $unwind: "$agent",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          details: 1,
          price_range: 1,
          location: 1,
          image: 1,
          agentId: 1,
          agent_name: "$agent.name",
          agent_image: "$agent.image",
          verification_status: 1,
          reviews: {
            $filter: {
              input: "$reviews",
              as: "review",
              cond: { $ne: ["$$review.user_name", null] },
            },
          },
        },
      },
    ];

    const property = await getDb().collection("properties").findOne(query);

    if (!property) {
      return res.status(404).send("property not found.");
    }
    // as aggregation returns array, I have to send first element of the array to the client
    res.status(200).send(property);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// update a single item
async function updateProperty(req, res) {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = {
      $set: { ...req.body },
    };
    console.log(updateDoc);
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
async function updatePropertyStatus(req, res) {
  try {
    // updating status of properties
    const filter = { _id: new ObjectId(req.body.id) };
    const updatedDoc = {
      $set: { verification_status: req.body.status },
    };
    const result = await getDb()
      .collection("properties")
      .updateOne(filter, updatedDoc);
    res.status(201).send(result);
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
  updatePropertyStatus,
};
