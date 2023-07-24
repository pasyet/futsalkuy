"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Event.belongsTo(models.Booking, ({foreignKey: "eventId"}))
      // Event.belongsToMany(models.User, ({through: "Booking"}))
      Event.hasMany(models.Booking, { foreignKey: "eventId" });

      Event.belongsTo(models.Field, { foreignKey: "fieldId" });
      Event.hasMany(models.Participant, { foreignKey: "eventId", as: "Event" });
      Event.belongsToMany(models.User, {
        foreignKey: "eventId",
        through: "Participant",
      });
    }
  }
  Event.init(
    {
      event_name: {
        type: DataTypes.STRING,
      },
      date: DataTypes.DATE,
      time: DataTypes.TIME,
      status: {
        type: DataTypes.STRING
      },
      fieldId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "field is required",
          },
          notEmpty: {
            msg: "field is required",
          },
        },
      },
      orderId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
      hooks: {
        beforeCreate: (instances, options) => {
          instances.status = "Inactive";
        },
      },
    }
  );
  return Event;
};
