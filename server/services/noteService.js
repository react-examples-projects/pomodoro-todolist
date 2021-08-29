class NoteService {
  constructor() {
    this.NoteModel = require("../models/Note");
    this.optionsUpdate = { new: true };
  }

  async createNote(payload) {
    const note = new this.NoteModel(payload);
    return await note.save();
  }
}

module.exports = new NoteService();
