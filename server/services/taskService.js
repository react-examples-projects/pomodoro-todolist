class TaskService {
  constructor() {
    this.TaskModel = require("../models/Task");
  }

  async getTasks(user_id) {
    return await this.TaskModel.find({ user_id });
  }

  async createTask(payload) {
    const task = new this.TaskModel(payload);
    return await task.save();
  }

  async removeTask(id) {
    const task = await this.TaskModel.findByIdAndRemove(id);
    return task;
  }

  async removeAllTasks(user_id) {
    const notes = await this.TaskModel.deleteMany({ user_id });
    return notes;
  }

  async updateTask({ id, ...payload }) {
    const task = await this.TaskModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return task;
  }
}

module.exports = new TaskService();
