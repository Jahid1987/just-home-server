const { getDb } = require("../db/connection");

function verifyRole(allowedRoles) {
  return async (req, res, next) => {
    const user = await getDb()
      .collection("users")
      .findOne({ email: req.user.email }); // finding the user with email

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user && user) {
      if (allowedRoles.includes(user.role)) {
        return next();
      } else {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized: No role information" });
    }
  };
}
module.exports = verifyRole;
