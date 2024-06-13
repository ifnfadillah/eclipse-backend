const express = require("express");
const router = express.Router();
const countDashboardController = require("../controllers/countDashboardController");

router.get("/data", countDashboardController.getDashboardData);

module.exports = router;
