'use strict';
const {
  Model
} = require('sequelize');
const student = require('./student');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      address.belongsTo(models.student, { foreignKey: 'studentId' });
    }
  }
  address.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    studentId: DataTypes.STRING,
    createdAt: DataTypes.Date,
    updatedAt: DataTypes.Date
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};