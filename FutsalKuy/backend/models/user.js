"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helpers/bcrypt-helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, { foreignKey: "userId" });

      User.hasMany(models.Participant, { foreignKey: "userId", as: "User" });
      User.belongsToMany(models.Event, { foreignKey: "userId", through: "Participant" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is required",
          },
          notEmpty: {
            msg: "username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "email is required",
          },
          notEmpty: {
            msg: "email is required",
          },
          isEmail: {
            msg: "invalid format mail",
          },
          // unique: {
          //   args: [[true]],
          //   msg: "email must be unique"
          // }
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "phoneNumber is required",
          },
          notEmpty: {
            msg: "phoneNumber is required",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "address is required",
          },
          notEmpty: {
            msg: "address is required",
          },
        },
      },
      profilePic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (instance, option) => {
          instance.password = hashingPassword(instance.password);
          instance.profilePic = instance.profilePic
            ? instance.profilePic
            : "aaaaa";
        },
      },
    }
  );
  return User;
};
