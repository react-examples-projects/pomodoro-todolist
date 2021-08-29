const { success, error } = require("../helpers/httpResponses");
const noteService = require("../services/noteService");

class NoteController {
  async createNote(req, res, next) {
    try {
      const { title, content, tags } = req.body;
      const data = await noteService.createNote({ title, content, tags });
      success(res, data, 201);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new NoteController();
