const express = require("express");
const router = express.Router();

const {
  //   getGoals,
  setUser,
  //   deleteGoal,
  //   updateGoal,
} = require("../controllers/employeesController");
// router.route('/').get(protect, getGoals);
router.post("/register", setUser);
// router.get('/', getGoals)
// router.post("/", postGoal);

// router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)
// router.put('/:id', putGoal)
// router.delete('/:id', deleteGoal)

module.exports = router;
