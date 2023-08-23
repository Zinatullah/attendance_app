const express = require("express");
const router = express.Router();
const {
  getUsers,
  getAttendance,
  allAttendances,
  clearAttendances,
  getDeviceStatus,
  getAttendanceCount,
  getUsersFromAllDevices,
  getAttendancesFromAllDevices,
  getAlldeveicesStatus,
  getCountAttendancesFromAllDevices

} = require("../controllers/devicesController");

router.get("/getUsers/:id", getUsers);
router.get("/getAttendance/:id", getAttendance);
router.get("/allAttendances", allAttendances);
router.get("/clearAttendances/:id", clearAttendances);
router.get("/getAttendanceCount/:id", getAttendanceCount);
router.get("/getDeviceStatus/:id", getDeviceStatus);
router.get("/getUsersFromAllDevices", getUsersFromAllDevices);
router.get("/getAttendancesFromAllDevices", getAttendancesFromAllDevices);
router.get("/getAlldeveicesStatus", getAlldeveicesStatus);
router.get("/getCountAttendancesFromAllDevices", getCountAttendancesFromAllDevices);
module.exports = router;
