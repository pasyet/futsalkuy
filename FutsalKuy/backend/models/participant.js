'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Participant.belongsTo(models.Event, ({foreignKey: "eventId"}))
      Participant.belongsTo(models.User, ({foreignKey: "userId"}))
    }
  };
  Participant.init({
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};