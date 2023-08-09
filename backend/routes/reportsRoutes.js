const express = require("express");
const router = express.Router();
const { getMonthReport } = require("../controllers/reportsController");

router.get("/getMonthReport/:month", getMonthReport);
module.exports = router;
