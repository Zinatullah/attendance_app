const express = require("express");
const router = express.Router();
const { getUsers, getEmployees, getLogs } = require("../controllers/logsController");

router.get("/getUsers", getUsers);
router.get("/getEmployees", getEmployees);
router.get("/getLogs", getLogs);
module.exports = router;
