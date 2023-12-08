const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// User registration logic
exports.addInfo = async (req, res) => {
  try {
    const { dob, address, contact, education, gender, hobbies, img } = req.body;

    let user = await User.findOne({ email: req.user.email });

    if (user) {
      user.dob = dob;
      user.address = address;
      user.contact = contact;
      user.education = education;
      user.gender = gender;
      user.hobbies = hobbies;
      user.img = img;
      await user.save();
    }

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// User login logic
exports.getInfo = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    } else return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
