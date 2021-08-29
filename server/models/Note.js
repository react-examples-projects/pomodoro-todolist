const { Schema, model, Types } = require("mongoose");

const NoteSchema = new Schema({
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
  tags: [
    {
      title: String,
      color: String,
      id: String,
    },
  ],
  user_id: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Note", NoteSchema);
