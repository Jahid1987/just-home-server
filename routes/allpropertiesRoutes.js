const express = require("express");
const { getDb } = require("../db/connection");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { verification_status: "verified" },
      },
      {
        $addFields: {
          agentObjectId: { $toObjectId: "$agentId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "agentObjectId",
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
          image: "$image",
          title: "$title",
          location: "$location",
          agent_name: "$agent.name",
          agent_image: "$agent.image",
          verification_status: 1,
          price_range: 1,
        },
      },
    ];
    const properties = await getDb()
      .collection("properties")
      .aggregate(pipeline)
      .toArray();
    if (!properties) {
      res.status(404).send("properties not found");
    }
    res.status(200).send(properties);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
