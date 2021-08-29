const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/noteController");

router.get("/", noteController.getNotes);
router.post("/", noteController.createNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.removeNote);

module.exports = router;
