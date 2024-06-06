const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

// reading all items
async function getUsers(req, res) {
  try {
    const users = await getDb().collection("users").find().toArray();
    if (!users) {
      res.status(404).send("users not found");
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// creating all users
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

// reading single user by email
async function getUserByEmail(req, res) {
  try {
    const user = await getDb()
      .collection("users")
      .findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// updating single item
async function updateUser(req, res) {
  try {
    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = {
      $set: { role: req.body.role },
    };

    const result = await getDb()
      .collection("users")
      .updateOne(filter, updateDoc);

    if (req.body.role === "fraud" && result.modifiedCount) {
      const query = {
        agent_email: req.body.email,
      };
      const results = await getDb().collection("properties").deleteMany(query);
      console.log(results);
    }
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
// deleting item
async function deleteUser(req, res) {
  try {
    const result = await getDb()
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
module.exports = {
  createUser,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
};
