const { Schema, model, Types } = require("mongoose");

const TaskSchema = new Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    maxlength: 500,
    required: true,
    trim: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  pomodoros: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [
    {
      title: String,
      color: String,
      id: String,
    },
  ],
  user_id: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Task", TaskSchema);
