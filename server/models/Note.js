const { Schema, model } = require("mongoose");

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
});

module.exports = model("Note", NoteSchema);
