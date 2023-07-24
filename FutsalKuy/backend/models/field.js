"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Field.hasMany(models.Event, { foreignKey: "fieldId" });
      Field.belongsTo(models.Provider, { foreignKey: "providerId" });
    }
  }
  Field.init(
    {
      field_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "field name is required",
          },
          notEmpty: {
            msg: "field name is required",
          },
        },
      },
      field_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "type field is required",
          },
          notEmpty: {
            msg: "type field is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price is required",
          },
          notNull: {
            msg: "price is required",
          },
          min: {
            args: 1000,
            msg: "price must up to 1000",
          },
        },
      },
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      schedule: DataTypes.STRING,
      providerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Field",
    }
  );
  return Field;
};
