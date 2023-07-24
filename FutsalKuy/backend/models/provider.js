'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provider.hasMany(models.Field, {foreignKey: "providerId"})
    }
  };
  Provider.init({
    provider_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "provider name is required"
        },
        notEmpty: {
          msg: "provider name is required"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "location is required"
        },
        notEmpty: {
          msg: "location is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Provider',
  });
  return Provider;
};