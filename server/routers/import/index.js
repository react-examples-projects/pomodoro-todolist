const express = require("express");
const router = express.Router();
const importController = require("../../controllers/importController");
const importDataSchema = require("../../helpers/validations/import");
const validate = require("../../helpers/validations/validate");

router.post("/import", validate(importDataSchema), importController.importData);

module.exports = router;
