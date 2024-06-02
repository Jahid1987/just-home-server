const { getDb } = require("../db/connection");

// reading all items
async function getUsers(req, res) {
  try {
    const users = await getDb()
      .collection("users")
      .find()
      .sort({ created_at: -1 })
      .toArray();
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
    const filter = { email: req.params.email };
    const updateDoc = {
      $set: { ...req.body },
    };
    const result = await getDb()
      .collection("users")
      .updateOne(filter, updateDoc);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// deleting item
async function deleteUser(req, res) {
  console.log(req.params.email);
  try {
    const result = await getDb()
      .collection("users")
      .deleteOne({ email: req.params.email });
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
