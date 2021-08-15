const UserService = require("../services/userService");
const { unauthorized, success, error } = require("../helpers/httpResponses");
const {
  hashPassword,
  getTokenFromPayload,
  isInvalidPassword,
} = require("../helpers/utils");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.existsUser(email);
      if (user) {
        if (isInvalidPassword(password, user.password))
          return unauthorized(res, "Usuario o clave incorrecta");

        delete user.password;
        const token = getTokenFromPayload(user);
        return success(res, { user, token });
      }
      unauthorized(res, "Usuario o clave incorrecta");
    } catch (err) {
      next(err);
    }
  }

  async signup(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const user = await UserService.existsUser(email);
      if (user) return error(res, "El correo ya está en uso");

      const passwordHashed = hashPassword(password);
      const userCreated = await UserService.createUser({
        name,
        email,
        password: passwordHashed,
      });

      success(res, userCreated, 201);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
