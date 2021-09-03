class NoteService {
  constructor() {
    this.NoteModel = require("../models/Note");
  }

  async getNotes(user_id) {
    return await this.NoteModel.find({ user_id });
  }

  async createNote(payload) {
    const note = new this.NoteModel(payload);
    return await note.save();
  }

  async removeNote(id) {
    const note = await this.NoteModel.findByIdAndRemove(id);
    return note;
  }

  async removeAllNotes(user_id) {
    const notes = await this.NoteModel.deleteMany({ user_id });
    return notes;
  }

  async updateNote({ id, ...payload }) {
    const note = await this.NoteModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return note;
  }
}

module.exports = new NoteService();
