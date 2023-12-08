const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  education: {
    type: String,
  },
  gender: {
    type: String,
  },
  img: {
    type: String,
    // You might store the image path or URL here
  },
  hobbies: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
