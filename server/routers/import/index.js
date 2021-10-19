const express = require("express");
const router = express.Router();
const importController = require("../../controllers/importController");
const validate = require("../../helpers/validations/validate");

router.post("/import", importController.importData);

module.exports = router;
