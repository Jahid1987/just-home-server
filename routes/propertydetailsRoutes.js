const express = require("express");
const { getDb } = require("../db/connection");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
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
        $group: {
          _id: "$_id",
          baths: { $first: "$baths" },
          beds: { $first: "$beds" },
          max_price: { $first: "$max_price" },
          min_price: { $first: "$min_price" },
          size: { $first: "$size" },
          image: { $first: "$image" },
          title: { $first: "$title" },
          location: { $first: "$location" },
          description: { $first: "$description" },
          agent_name: { $first: "$agent_name" },
          agent_email: { $first: "$agent_email" },
          agent_image: { $first: "$agent_image" },
          created_at: { $first: "$created_at" },
          verification_status: { $first: "$verification_status" },
          updated_at: { $first: "$updated_at" },
          reviews: {
            $push: {
              reviewr_email: "$reviews.reviewr_email",
              user_name: "$reviews.reviewer_name",
              user_image: "$reviews.reviewer_image",
              rating: "$reviews.rating",
              comment: "$reviews.comment",
              created_at: "$reviews.created_at",
            },
          },
        },
      },
    ];

    const properties = await getDb()
      .collection("properties")
      .aggregate(pipeline)
      .toArray();
    if (!properties.length > 0) {
      return res.status(404).send("properties not fount");
    }
    res.status(200).send(properties[0]);
  } catch (err) {
    res.status(5000).send(err.message);
  }
});

module.exports = router;
