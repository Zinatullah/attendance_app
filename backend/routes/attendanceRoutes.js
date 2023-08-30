const express = require("express");
const router = express.Router();
const {
  getSingleUser,
  getMultipleUsers,
  getSingleUserAttendance,
  leaveForm,
  vacation,
  getAllvacation,
  generalLeaveForm,
  generalLeaveCheck,
  EditleaveForm,
  removeVacation
} = require("../controllers/attendanceController");

router.get("/getSingleUser/:id", getSingleUser);
router.get("/getMultipleUsers", getMultipleUsers);
router.post("/getSingleUserAttendance", getSingleUserAttendance);
router.post("/leaveForm", leaveForm);
router.post("/vacation", vacation);
router.post("/getAllvacation", getAllvacation);
router.post("/generalLeaveForm", generalLeaveForm);
router.post("/generalLeaveCheck", generalLeaveCheck);
router.put("/EditleaveForm", EditleaveForm);
router.put("/removeVacation", removeVacation);
module.exports = router;
