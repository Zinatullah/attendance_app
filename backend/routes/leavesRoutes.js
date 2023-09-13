const express = require("express");
const router = express.Router();
const { singleUserAllLeaves, updateGeneralLeave, removeGeneralLeave, currentMonthGeneralLeaves } = require("../controllers/leavesController");

router.put("/singleUserAllLeaves", singleUserAllLeaves);
router.put("/updateGeneralLeave", updateGeneralLeave);
router.post(`/removeGeneralLeave/:id`, removeGeneralLeave);
router.post(`/currentMonthGeneralLeaves`, currentMonthGeneralLeaves);
module.exports = router;
