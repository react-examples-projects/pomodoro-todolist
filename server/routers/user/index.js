const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const validate = require("../../helpers/validations/validate");
const {
  perfilPhotoSchemaValidation,
  passwordChangeValidation,
  nameChangeValidation,
} = require("../../helpers/validations/validations");

router.patch(
  "/perfil-photo",
  validate(perfilPhotoSchemaValidation),
  userController.perfilPhoto
);

router.patch(
  "/password",
  validate(passwordChangeValidation),
  userController.password
);

router.patch(
  "/name",
  validate(nameChangeValidation),
  userController.changeUserName
);

router.get("/user", userController.getInfo);

module.exports = router;
