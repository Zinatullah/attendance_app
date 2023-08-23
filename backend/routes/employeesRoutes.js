const express = require("express");
const router = express.Router();

const {
  setEmployee,
  getEmployees,
  updateEmployee,
  removeEmployee,
} = require("../controllers/employeesController");
router.post("/register", setEmployee);
router.get("/getEmployees", getEmployees);
router.post("/updateEmployee", updateEmployee);
router.post("/removeEmployee", removeEmployee);

module.exports = router;
