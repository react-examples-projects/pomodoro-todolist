const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/noteController");

const validate = require("../../helpers/validations/validate");
const {
  createNoteSchema,
  updateNoteSchema,
  removeNoteSchema,
} = require("../../helpers/validations/notes");

router.get("/", noteController.getNotes);
router.post("/", validate(createNoteSchema), noteController.createNote);
router.put("/:id", validate(updateNoteSchema), noteController.updateNote);
router.delete("/:id", validate(removeNoteSchema), noteController.removeNote);

module.exports = router;
