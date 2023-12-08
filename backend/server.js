const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const app = express();
// Increase payload size limit (for JSON payloads)
app.use(bodyParser.json({ limit: "50mb" })); // Adjust the limit as needed

// Increase payload size limit (for URL-encoded payloads)
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // Adjust the limit as needed

// MongoDB configuration
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is up and running");
});
app.use("/", authRoutes);
app.use("/", profileRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
