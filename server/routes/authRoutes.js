const express = require("express");
const authController = require("../controllers/authController");
const db = require("../model/database");
const router = express.Router();

const { authenticateAdmin, verifyToken } = authController;

router.post("/login", authenticateAdmin(db));

router.get("/api/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard" });
});

module.exports = router;
