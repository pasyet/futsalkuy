const { User, Event } = require("../models");

class ProfileController {
  static async GetProfile(req, res, next) {
    const { email } = req.user;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "DataNotFound" };
      res.status(200).json({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async GetProfileById(req, res, next) {
    try {
      const userId = await User.findByPk(req.params.userId, {
        include: [
          {
            model: Event,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!userId) throw { name: "Not Found" };
      res.status(200).json({ userId });
    } catch (error) {
      if (error.name == "Not Found")
        res.status(404).json({ message: "Data Not Found" });
      else next(error);
      console.log(error);
    }
  }

  // static async GetProfileById (req, res, next) {
  //     try {
  //         const userId = await User.findByPk(req.params.userId, {
  //             include: [
  //                 {
  //                     model: Event,
  //                     attributes: { exclude: ["createdAt", "updatedAt"] }

  //                 }
  //             ], attributes: { exclude: ["createdAt", "updatedAt"] }
  //         })
  //         if (!userId) throw ({ name: 'DataNotFound' })
  //         res.status(200).json(userId)
  //     } catch (error) {
  //         console.log(error);
  //         next(error)
  //     }
  // }

  static async UpdateProfile(req, res, next) {
    const { username, phoneNumber, address, profilePic } = req.body;
    try {
      const updateProfile = await User.update(
        { username, phoneNumber, address, profilePic },
        {
          where: { id: req.params.userId },
          returning: true,
        }
      );
      res.status(200).json(updateProfile[1][0]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
