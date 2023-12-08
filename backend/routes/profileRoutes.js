const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const profileController = require("../controllers/profileController");
const authenticateToken = require("../middleware/authenticationMiddleware");

// Register route
router.post("/addInfo", authenticateToken, profileController.addInfo);

// Login route
router.get("/dashboard", authenticateToken, profileController.getInfo);

module.exports = router;
