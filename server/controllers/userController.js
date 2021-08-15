const { uploadImages } = require("../helpers/requests");
const UserService = require("../services/userService");
const { success, error } = require("../helpers/httpResponses");

class UserController {
  async perfilPhoto(req, res, next) {
    try {
      const perfil_photo = req.files.perfil_photo.data;
      const data = await uploadImages(perfil_photo);
      await UserService.setPerfilPhoto({
        id: req.user._id,
        perfil_photo: data.url,
      });
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async password(req, res, next) {
    try {
      const { password, passwordConfirm } = req.body;
      const id = req.user._id;
      if (password !== passwordConfirm) {
        return error(res, "Las contraseñas no coinciden", 400);
      }
      const userUpdated = await UserService.changePassword({ id, password });
      success(res, userUpdated);
    } catch (err) {
      next(err);
    }
  }

  async getInfo(req, res, next) {
    try {
      const user = await UserService.getUserById(req.user._id);
      success(res, user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
