const { hashPassword } = require("../helpers/utils");
class UserService {
  constructor() {
    this.UserModel = require("../models/User");
    this.optionsUpdate = { new: true };
  }

  async createUser(payload) {
    const user = new this.UserModel(payload);
    return new Promise((resolve, reject) => {
      user.save((err, result) => {
        if (err) return reject(err);
        result = result.toObject();
        delete result.password;
        resolve(result);
      });
    });
  }

  async existsUser(email) {
    const user = await this.UserModel.findOne({ email }).lean();
    return user;
  }

  async isEmailInUse(email) {
    const users = await this.UserModel.find({ email }).lean();
    return users.length > 0;
  }

  async getUserById(id) {
    const user = await this.UserModel.findById(id, { password: 0 }).lean();
    return user;
  }

  async setPerfilPhoto({ id, perfil_photo }) {
    const userUpdated = await this.UserModel.findByIdAndUpdate(
      id,
      { perfil_photo },
      this.optionsUpdate
    ).lean();
    return userUpdated;
  }

  async changePassword({ id, password }) {
    const userUpdated = await this.UserModel.findByIdAndUpdate(
      id,
      { password: hashPassword(password) },
      this.optionsUpdate
    ).lean();
    delete userUpdated.password;
    return userUpdated;
  }

  async changeName({ id, name }) {
    const userUpdate = await this.UserModel.findByIdAndUpdate(
      id,
      { name },
      this.optionsUpdate
    ).lean();

    delete userUpdate.password;
    return userUpdate;
  }
}

module.exports = new UserService();
