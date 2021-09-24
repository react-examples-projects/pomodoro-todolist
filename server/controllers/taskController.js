const { success } = require("../helpers/httpResponses");
const taskService = require("../services/taskService");

class TaskController {
  async getTasks(req, res, next) {
    try {
      const data = await taskService.getTasks(req.user._id);
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async createTask(req, res, next) {
    try {
      const { title, content, minutes, pomodoros, category, tags } = req.body;
      const data = await taskService.createTask({
        title,
        content,
        tags,
        minutes,
        pomodoros,
        category,
        user_id: req.user._id,
      });
      success(res, data, 201);
    } catch (err) {
      next(err);
    }
  }

  async removeTask(req, res, next) {
    try {
      const { id } = req.params;
      const data = await taskService.removeTask(id);
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async removeAllTasks(req, res, next) {
    try {
      const data = await taskService.removeAllTasks(req.user._id);
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, minutes, pomodoros, category, tags } = req.body;
      const data = await taskService.updateTask({
        id,
        title,
        content,
        minutes,
        pomodoros,
        category,
        tags,
        user_id: req.user._id,
      });
      success(res, data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TaskController();
