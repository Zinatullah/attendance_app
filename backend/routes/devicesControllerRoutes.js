const express = require("express");
const router = express.Router();
const {
  getUsers,
  getAttendance,
  getAttendanceFromOtherTable,
  clearAttendances,
  getDeviceStatus,
  getUsersFromAllDevices,
  getAttendancesFromAllDevices,
  getAlldeveicesStatus,
  getCountAttendancesFromAllDevices

} = require("../controllers/devicesController");

router.get("/getUsers/:id", getUsers);
router.get("/getAttendance/:id", getAttendance);
router.get("/getAttendances/:id", getAttendanceFromOtherTable);
router.get("/clearAttendances/:id", clearAttendances);
router.get("/getDeviceStatus/:id", getDeviceStatus);
router.get("/getUsersFromAllDevices", getUsersFromAllDevices);
router.get("/getAttendancesFromAllDevices", getAttendancesFromAllDevices);
router.get("/getAlldeveicesStatus", getAlldeveicesStatus);
router.get("/getCountAttendancesFromAllDevices", getCountAttendancesFromAllDevices);
module.exports = router;
