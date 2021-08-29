const { success, error } = require("../helpers/httpResponses");
const noteService = require("../services/noteService");

class NoteController {
  async getNotes(req, res, next) {
    try {
      const data = await noteService.getNotes();
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async createNote(req, res, next) {
    try {
      const { title, content, tags } = req.body;
      const data = await noteService.createNote({ title, content, tags });
      success(res, data, 201);
    } catch (err) {
      next(err);
    }
  }

  async removeNote(req, res, next) {
    try {
      const { id } = req.params;
      const data = await noteService.removeNote(id);
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async updateNote(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, tags } = req.body;
      const data = await noteService.updateNote({ id, title, content, tags });
      success(res, data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new NoteController();