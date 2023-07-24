const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt-helpers");
const { sign } = require("../helpers/jwt-helpers");

class UserController {

  static async Login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        attributes: { email, password },
        where: { email },
      });
      if (!user) throw { name: "EmailorPasswordNotFound" };
      else if (!user.length === undefined)
        throw { name: "EmailorPasswordNotFound" };
      else if (!comparePassword(password, user.password))
        throw { name: "InvalidPassword" };
      const access_token = sign({ id: user.id, email });
      res.status(200).json({ access_token, id: user.id, email });
    } catch (error) {
      next(error);
      console.log(error, 'hsashkuahk');
    }
  }

  static async register(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
