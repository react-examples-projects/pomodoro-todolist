class NoteService {
  constructor() {
    this.NoteModel = require("../models/Note");
  }

  async getNotes() {
    return await this.NoteModel.find({});
  }

  async createNote(payload) {
    const note = new this.NoteModel(payload);
    return await note.save();
  }

  async removeNote(id) {
    const note = await this.NoteModel.findByIdAndRemove(id);
    return note;
  }

  async updateNote({ id, ...payload }) {
    const note = await this.NoteModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return note;
  }
}

module.exports = new NoteService();
