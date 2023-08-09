const express = require("express");
const router = express.Router();
const { getUser, getUsers, getUserAttendance, updateUser } = require("../controllers/userAttendanceController");

router.get("/getUsers", getUsers);
router.get("/getUserAttendance", getUserAttendance);
router.get("/updateUser", updateUser);
router.get("/getUser", getUser);

module.exports = router;
