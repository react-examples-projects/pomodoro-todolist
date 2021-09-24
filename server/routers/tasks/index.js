const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");

const validate = require("../../helpers/validations/validate");
const {
  createTaskSchema,
  updateTaskSchema,
  removeTaskSchema,
} = require("../../helpers/validations/tasks");

router.get("/", taskController.getTasks);
router.post("/", validate(createTaskSchema), taskController.createTask);
router.put("/:id", validate(updateTaskSchema), taskController.updateTask);
router.delete("/all", taskController.removeAllTasks);
router.delete("/:id", validate(removeTaskSchema), taskController.removeTask);

module.exports = router;
