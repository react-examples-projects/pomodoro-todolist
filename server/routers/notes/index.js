const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/noteController");

const validate = require("../../helpers/validations/validate");
const { createNoteSchema } = require("../../helpers/validations/notes");

router.get("/", noteController.getNotes);
router.post("/", validate(createNoteSchema), noteController.createNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.removeNote);

module.exports = router;
