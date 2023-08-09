const express = require("express");
const router = express.Router();
const { updateGeneralLeave, removeGeneralLeave } = require("../controllers/leavesController");

router.put("/updateGeneralLeave", updateGeneralLeave);
router.post(`/removeGeneralLeave/:id`, removeGeneralLeave);
module.exports = router;
