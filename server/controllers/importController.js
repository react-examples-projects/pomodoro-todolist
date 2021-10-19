const { success, error } = require("../helpers/httpResponses");
const noteModel = require("../models/Note");
const taskModel = require("../models/Task");

class ImportController {
  async importData(req, res, next) {
    try {
      const { data, type } = req.body;
      let result;

      if (type === "note") {
        result = await noteModel.insertMany(data);
      } else if (type === "task") {
        result = await taskModel.insertMany(data);
      } else {
        return error(res, "El tipo de recurso no es válido", 400);
      }
      success(res, result, 201);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ImportController();
