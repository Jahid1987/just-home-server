const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookiePerser = require("cookie-parser");
const { connectDb } = require("./db/connection");
const app = express();
const port = process.env.PORT || 5000;
// routes imported
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cityRoutes = require("./routes/cityRoutes");
const allpropertiesRoutes = require("./routes/allpropertiesRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userRoutes = require("./routes/userRoutes");
const offerRoutes = require("./routes/offerRoutes");
const propertydetailsRoutes = require("./routes/propertydetailsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://just-home-625cb.web.app",
      "https://just-home-625cb.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(cookiePerser());

// all routes

app.use("/auth", authRoutes);
app.use("/properties", propertyRoutes);
app.use("/allproperties", allpropertiesRoutes);
app.use("/propertydetails", propertydetailsRoutes);
app.use("/reviews", reviewRoutes);
app.use("/cities", cityRoutes);
app.use("/wishlists", wishlistRoutes);
app.use("/users", userRoutes);
app.use("/offers", offerRoutes);
app.use("/payments", paymentRoutes);

// Connecting to the server and then listening to the routers hit
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`This server is runnign at ${port}`);
    });
  })
  .catch((err) => console.error(err));
